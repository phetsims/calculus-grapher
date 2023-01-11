// Copyright 2022, University of Colorado Boulder

/**
 * CurveManipulationProperties is responsible for
 *  - Keeping track of the (shared) current mode of curves. When the user drags a TransformedCurve, the curve is
 *    manipulated based on the current CurveManipulationMode, allowing the user to create custom curves.
 *  - Keeping track of the 'width' of the curve-manipulation. This only applies to HILL, TRIANGLE, PEDESTAL, PARABOLA,
 *     and SINE, and the value is interpreted differently for each response algorithm to curve user-manipulation.
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

// constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;

type SelfOptions = EmptySelfOptions;

export type CurveManipulationPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CurveManipulationProperties {

  // the 'mode' that user is in for manipulating curves. This is manipulated by the view.
  public readonly modeProperty: EnumerationProperty<CurveManipulationMode>;

  // the width of the curve-manipulation. This only applies to some CurveManipulationModes
  // and the value is interpreted differently for each response algorithm to curve
  // user-manipulation.
  public readonly widthProperty: NumberProperty;

  public constructor( curveManipulationModeChoices: CurveManipulationMode[],
                      providedOptions: CurveManipulationPropertiesOptions ) {

    const options = providedOptions;

    // initial mode of the simulation
    const initialMode = CurveManipulationMode.HILL;

    assert && assert( curveManipulationModeChoices.includes( initialMode ),
      `curveManipulationModeChoices must include initial value: ${initialMode}` );

    this.modeProperty = new EnumerationProperty( initialMode, {
      validValues: curveManipulationModeChoices,
      tandem: options.tandem.createTandem( 'modeProperty' )
    } );

    this.widthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE,
      tandem: options.tandem.createTandem( 'widthProperty' )
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
