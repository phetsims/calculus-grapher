// Copyright 2022, University of Colorado Boulder

/**
 * CurveManipulationModeRadioButtonGroupOptions is the radio button group for choosing a curve manipulation model
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationIconNode from './CurveManipulationIconNode.js';

type SelfOptions = EmptySelfOptions;

export type CurveManipulationModeRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class CurveManipulationModeRadioButtonGroup extends RectangularRadioButtonGroup<CurveManipulationMode> {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationMode>,
                      providedOptions: CurveManipulationModeRadioButtonGroupOptions ) {

    const options = providedOptions;

    const rectangularRadioButtonGroupItems: RectangularRadioButtonGroupItem<CurveManipulationMode>[] =
      curveManipulationModeProperty.validValues!.map(
        mode => {
          return {
            value: mode,
            createNode: tandem => new CurveManipulationIconNode( mode,
              { tandem: tandem.createTandem( `${mode.tandemPrefix}Icon` ) } ),
            tandemName: `${mode.tandemPrefix}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
          };
        }
      );

    super( curveManipulationModeProperty, rectangularRadioButtonGroupItems, options );
  }
}

calculusGrapher.register( 'CurveManipulationModeRadioButtonGroup', CurveManipulationModeRadioButtonGroup );
