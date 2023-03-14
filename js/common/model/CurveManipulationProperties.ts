// Copyright 2022-2023, University of Colorado Boulder

/**
 * CurveManipulationProperties is responsible for
 *  - Keeping track of the (shared) current mode associated with curves. When the user drags a TransformedCurve, the curve is
 *    manipulated based on the current CurveManipulationMode, allowing the user to create custom curves.
 *  - Keeping track of the 'width' of the curve-manipulation. This only applies to HILL, TRIANGLE, PEDESTAL, PARABOLA,
 *     and SINUSOID, and the value is interpreted differently for each response algorithm to curve user-manipulation.
 *
 * @author Martin Veillette
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

// Constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;

type SelfOptions = EmptySelfOptions;

type CurveManipulationPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CurveManipulationProperties {

  // The 'mode' that user is in for manipulating curves.
  public readonly modeProperty: EnumerationProperty<CurveManipulationMode>;

  // The width of the curve-manipulation. This only applies to some CurveManipulationModes
  // and the value is interpreted differently for each response algorithm to curve
  // user-manipulation.
  public readonly widthProperty: NumberProperty;

  public constructor( curveManipulationModeChoices: CurveManipulationMode[],
                      providedOptions: CurveManipulationPropertiesOptions ) {

    const options = providedOptions;

    // Initial mode of the simulation
    const initialMode = CurveManipulationMode.HILL;

    assert && assert( curveManipulationModeChoices.includes( initialMode ),
      `curveManipulationModeChoices must include initial value: ${initialMode}` );

    this.modeProperty = new EnumerationProperty( initialMode, {
      validValues: curveManipulationModeChoices,
      tandem: options.tandem.createTandem( 'modeProperty' ),
      phetioDocumentation: 'Determines how the curve will be modified (manipulated) when the student interacts with it. ' +
                           'Applies to the interactive (original and predict) curves only.'
    } );

    this.widthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE,
      tandem: options.tandem.createTandem( 'widthProperty' ),
      phetioDocumentation: 'Determines how wide the change is when modifying (manipulating) a curve.' +
                           'Note that is not applicable to all manipulation modes. ' +
                           'If a width slider is not shown for the selected manipulation mode, ' +
                           'then width is irrelevant for that mode.'
    } );
  }

  /**
   * Gets the current CurveManipulationMode.
   */
  public get mode(): CurveManipulationMode {
    return this.modeProperty.value;
  }

  /**
   * Gets the current curve-manipulation width.
   */
  public get width(): number {
    return this.widthProperty.value;
  }

  public reset(): void {
    this.modeProperty.reset();
    this.widthProperty.reset();
  }

}
calculusGrapher.register( 'CurveManipulationProperties', CurveManipulationProperties );
