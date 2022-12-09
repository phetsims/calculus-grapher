// Copyright 2022, University of Colorado Boulder

/**
 * ReferenceLine is the model for the vertical line
 *
 * @author Martin Veillette
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = EmptySelfOptions;

export type ReferenceLineOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class ReferenceLine {

  // value to track the x position of the reference line
  public readonly xCoordinateProperty: NumberProperty;

  public constructor( providedOptions?: ReferenceLineOptions ) {

    const options = optionize<ReferenceLineOptions, SelfOptions>()(
      {}, providedOptions );

    this.xCoordinateProperty = new NumberProperty( CURVE_X_RANGE.getCenter(), {
      range: CURVE_X_RANGE,
      tandem: options.tandem.createTandem( 'xCoordinateProperty' )
    } );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.xCoordinateProperty.reset();
  }
}
calculusGrapher.register( 'ReferenceLine', ReferenceLine );
