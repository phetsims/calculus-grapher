// Copyright 2022-2026, University of Colorado Boulder

/**
 * CurveManipulationProperties is responsible for
 *  - Keeping track of the (shared) CurveManipulationType. When the user drags a TransformedCurve, the curve is
 *    manipulated based on the current CurveManipulationType, allowing the user to create custom curves.
 *  - Keeping track of the 'width' of the curve-manipulation. This only applies to HILL, TRIANGLE, PEDESTAL, PARABOLA,
 *     and SINUSOID, and the value is interpreted differently for each response algorithm to curve user-manipulation.
 *
 * @author Martin Veillette
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveManipulationType from './CurveManipulationType.js';

// Constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;

type SelfOptions = EmptySelfOptions;

type CurveManipulationPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CurveManipulationProperties {

  // The 'mode' that user is in for manipulating curves.
  public readonly curveManipulationTypeProperty: EnumerationProperty<CurveManipulationType>;

  // The width of the curve-manipulation. This only applies to some CurveManipulationModes
  // and the value is interpreted differently for each response algorithm to curve
  // user-manipulation.
  public readonly widthProperty: NumberProperty;

  public constructor( curveManipulationTypeValues: CurveManipulationType[],
                      providedOptions: CurveManipulationPropertiesOptions ) {

    const options = providedOptions;

    this.curveManipulationTypeProperty = new EnumerationProperty( CurveManipulationType.HILL, {
      validValues: curveManipulationTypeValues,
      tandem: options.tandem.createTandem( 'curveManipulationTypeProperty' ),
      phetioDocumentation: 'Determines how the curve will be modified (manipulated) when the student interacts with it. ' +
                           'Applies to the interactive (primary and predict) curves only.',
      phetioFeatured: true
    } );

    this.widthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE,
      tandem: options.tandem.createTandem( 'widthProperty' ),
      phetioDocumentation: 'Determines how wide the change is when modifying (manipulating) a curve.' +
                           'Note that is not applicable to all curve manipulation types. ' +
                           'If a width slider is not shown, then width is irrelevant.'
    } );
  }

  public reset(): void {
    this.curveManipulationTypeProperty.reset();
    this.widthProperty.reset();
  }

}
calculusGrapher.register( 'CurveManipulationProperties', CurveManipulationProperties );