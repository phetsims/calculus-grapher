// Copyright 2020-2022, University of Colorado Boulder

/**
 * OriginalCurve is a Curve sub-type for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the CurvePoints and the OriginalCurve's integral, derivative, and second-derivative Curves.
 *
 * OriginalCurve is mainly responsible for:
 *   - Keeping track of the current CurveManipulationMode. When the user drags on the OriginalCurve, the curve is
 *     manipulated based on the current CurveManipulationMode, allowing the user to create custom curves.
 *
 *   - Keeping track of the 'width' of the curve-manipulation. This only applies to HILL, TRIANGLE, PEDESTAL, PARABOLA,
 *     and SINE, and the value is interpreted differently for each response algorithm to curve user-manipulation.
 *
 *   - Implementing smoothing, undoing, and other interactions.
 *
 * Like Curve, OriginalCurve is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and OriginalCurves are never disposed.
 *
 * @author Brandon Li
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import TransformedCurve, { TransformedCurveOptions } from './TransformedCurve.js';
import Vector2 from '../../../../dot/js/Vector2.js';

// constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;
const STANDARD_DEVIATION = CalculusGrapherQueryParameters.smoothingStandardDeviation;

type SelfOptions = EmptySelfOptions;

export type OriginalCurveOptions = SelfOptions & TransformedCurveOptions;

export default class OriginalCurve extends TransformedCurve {

  // the 'mode' that user is in for manipulating curves. This
  // is manipulated by the view.
  public readonly curveManipulationModeProperty: EnumerationProperty<CurveManipulationMode>;

  // the width of the curve-manipulation. This only applies to some CurveManipulationModes
  // and the value is interpreted differently for each response algorithm to curve
  // user-manipulation.
  public readonly curveManipulationWidthProperty: NumberProperty;

  public constructor( curveManipulationModeChoices: CurveManipulationMode[],
                      providedOptions: OriginalCurveOptions ) {

    const options = optionize<OriginalCurveOptions, SelfOptions, TransformedCurveOptions>()( {}, providedOptions );

    super( options );

    assert && assert( curveManipulationModeChoices.includes( CurveManipulationMode.HILL ),
      'curveManipulationModeChoices must include initial value' );

    this.curveManipulationModeProperty = new EnumerationProperty( CurveManipulationMode.HILL, {
      validValues: curveManipulationModeChoices,
      tandem: options.tandem.createTandem( 'curveManipulationModeProperty' )
    } );

    this.curveManipulationWidthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE,
      tandem: options.tandem.createTandem( 'curveManipulationWidthProperty' )
    } );
  }

  /**
   * Gets the current CurveManipulationMode.
   *
   */
  public get curveManipulationMode(): CurveManipulationMode {
    return this.curveManipulationModeProperty.value;
  }

  /**
   * Gets the current curve-manipulation width.
   */
  public get curveManipulationWidth(): number {
    return this.curveManipulationWidthProperty.value;
  }

  /**
   * Resets the OriginalCurve.
   * Called when the reset-all button is pressed.
   */
  public override reset(): void {

    super.reset();

    this.curveManipulationModeProperty.reset();
    this.curveManipulationWidthProperty.reset();
  }


  /**
   * Sets the y-values of this CurvedPoints of this Curve to its last saved state.
   *
   * This method is invoked when the undo button is pressed, which successively undos the last action.
   */
  public undoToLastSave(): void {

    // Revert to the saved y-value of each CurvePoint.
    this.points.forEach( point => point.undoToLastSave() );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Smooths the curve. Called when the user presses the 'smooth' button
   * This method uses a weighted-average algorithm for 'smoothing' a curve, using a gaussian kernel
   * see https://en.wikipedia.org/wiki/Kernel_smoother
   */
  public smooth(): void {

    // Save the current values of our Points for the next undoToLastSave call.
    // Note that the current y-values are the same as the previous y-values
    // for all Points in the OriginalCurve.
    this.saveCurrentPoints();

    // gaussian kernel that will be used in the convolution of our curve
    const gaussianFunction = ( x: number ) => Math.exp( -1 / 2 * ( x / STANDARD_DEVIATION ) ** 2 ) /
                                              ( STANDARD_DEVIATION * Math.sqrt( 2 * Math.PI ) );

    // Loop through each Point of the curve and set the new y-value.
    this.points.forEach( point => {

      // Flag that tracks the sum of the weighted y-values of all Points
      let weightedY = 0;
      let totalWeight = 0;

      // we want to use the kernel over a number of standard deviations
      // beyond 3 standard deviations, the kernel has a very small weight, less than 1%, so it becomes irrelevant.
      const numberOfStandardDeviations = 3;

      // Loop through each point on BOTH sides of the window, adding the y-value to our total.
      for ( let dx = -numberOfStandardDeviations * STANDARD_DEVIATION;
            dx < numberOfStandardDeviations * STANDARD_DEVIATION;
            dx += 1 / this.pointsPerCoordinate ) {

        // weight of the point
        const weight = gaussianFunction( dx );

        totalWeight += weight;

        // Add the Point's lastSavedY, which was the Point's y-value before the smooth() method was called.
        weightedY += this.getClosestPointAt( point.x + dx ).lastSavedY * weight;
      }

      // Set the Point's new y-value to the weighted average.
      point.y = weightedY / totalWeight;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  public operatedCurve( position: Vector2,
                        penultimatePosition: Vector2,
                        antepenultimatePosition: Vector2 | null ): void {
    this.userManipulatedCurve(
      this.curveManipulationMode,
      this.curveManipulationWidth,
      position,
      penultimatePosition,
      antepenultimatePosition );
  }
}

calculusGrapher.register( 'OriginalCurve', OriginalCurve );
