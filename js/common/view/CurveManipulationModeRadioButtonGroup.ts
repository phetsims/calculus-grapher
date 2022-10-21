// Copyright 2022, University of Colorado Boulder

/**
 * CurveManipulationModeRadioButtonGroupOptions is the radio button group for choosing a curve manipulation model
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions, RectangularRadioButtonItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import { Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulationModeRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class CurveManipulationModeRadioButtonGroup extends RectangularRadioButtonGroup<CurveManipulationMode> {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationMode>,
                      providedOptions: CurveManipulationModeRadioButtonGroupOptions ) {

    const options = providedOptions;

    const rectangularRadioButtonGroupItems: RectangularRadioButtonItem<CurveManipulationMode>[] =
      curveManipulationModeProperty.validValues!.map(
        mode => {
          return {
            value: mode,
            createNode: () => new Text( mode.toString() ),
            tandemName: `${mode.tandemPrefix}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
          };
        }
      );

    super( curveManipulationModeProperty, rectangularRadioButtonGroupItems, options );
  }
}

calculusGrapher.register( 'CurveManipulationModeRadioButtonGroup', CurveManipulationModeRadioButtonGroup );
