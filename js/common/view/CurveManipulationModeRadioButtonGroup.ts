// Copyright 2022-2025, University of Colorado Boulder

/**
 * CurveManipulationModeRadioButtonGroup is the radio button group for choosing a curve manipulation model.
 * The buttons are arranged in a 2-column grid. Hiding buttons via PhET-iO will automatically cause the
 * layout to update so that there are no 'holes' in the grid.
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import GridBox from '../../../../scenery/js/layout/nodes/GridBox.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import CurveManipulationIconNode from './CurveManipulationIconNode.js';

export default class CurveManipulationModeRadioButtonGroup extends GridBox {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationMode>,
                      curveManipulationStroke: TColor,
                      tandem: Tandem ) {

    const validModes = curveManipulationModeProperty.validValues!;
    assert && assert( validModes );

    // So that all icons have the same effective size
    const alignBoxOptions = {
      group: new AlignGroup()
    };

    // Create a radio button for each mode
    const buttons = validModes.map( mode => new RectangularRadioButton( curveManipulationModeProperty, mode, {
      content: new AlignBox( new CurveManipulationIconNode( mode, curveManipulationStroke ), alignBoxOptions ),
      baseColor: CalculusGrapherColors.panelFillProperty,
      xMargin: 10,
      yMargin: 7,
      buttonAppearanceStrategyOptions: {
        selectedLineWidth: 2
      },
      tandem: tandem.createTandem( `${mode.tandemPrefix}RadioButton` )
    } ) );

    super( {
      children: buttons,
      autoColumns: 2,
      xSpacing: 4,
      ySpacing: 4,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurveManipulationModeRadioButtonGroup', CurveManipulationModeRadioButtonGroup );