// Copyright 2022-2023, University of Colorado Boulder

/**
 * CurveManipulationModeRadioButtonGroup is the radio button group for choosing a curve manipulation model
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationIconNode from './CurveManipulationIconNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import { TColor } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class CurveManipulationModeRadioButtonGroup extends RectangularRadioButtonGroup<CurveManipulationMode> {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationMode>,
                      curveManipulationStroke: TColor,
                      tandem: Tandem ) {

    const validModes = curveManipulationModeProperty.validValues!;
    assert && assert( validModes );

    // Create a radio button for each mode
    const rectangularRadioButtonGroupItems: RectangularRadioButtonGroupItem<CurveManipulationMode>[] =
      validModes.map(
        mode => {
          return {
            value: mode,
            createNode: () => new CurveManipulationIconNode( mode, {
              stroke: curveManipulationStroke
            } ),
            tandemName: `${mode.tandemPrefix}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
          };
        }
      );

    super( curveManipulationModeProperty, rectangularRadioButtonGroupItems, {
      spacing: 3,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty
      },
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurveManipulationModeRadioButtonGroup', CurveManipulationModeRadioButtonGroup );
