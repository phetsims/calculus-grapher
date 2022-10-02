// Copyright 2022, University of Colorado Boulder

/**
 * CurveManipulationModeRadioButtonGroupOptions is the radio button group for choosing a curve manipulation model
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem, AquaRadioButtonGroupOptions } from '../../../../sun/js/AquaRadioButtonGroup.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import { Text } from '../../../../scenery/js/imports.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulationModeRadioButtonGroupOptions = SelfOptions & PickRequired<AquaRadioButtonGroupOptions, 'tandem'>;

export default class CurveManipulationModeRadioButtonGroup extends AquaRadioButtonGroup<CurveManipulationMode> {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationMode>,
                      providedOptions: CurveManipulationModeRadioButtonGroupOptions ) {

    const options = providedOptions;

    const aquaRadioButtonGroupItems: AquaRadioButtonGroupItem<CurveManipulationMode>[] =
      CurveManipulationMode.enumeration.values.map(
        mode => {
          return {
            value: mode,
            createNode: () => new Text( mode.toString() ),
            tandemName: `${mode.tandemPrefix}${AquaRadioButton.TANDEM_NAME_SUFFIX}`
          };
        }
      );

    super( curveManipulationModeProperty, aquaRadioButtonGroupItems, options );
  }
}

calculusGrapher.register( 'CurveManipulationModeRadioButtonGroup', CurveManipulationModeRadioButtonGroup );
