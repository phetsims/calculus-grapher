// Copyright 2022-2023, University of Colorado Boulder

/**
 * PredictEnabledRadioButtonGroup is the radio button group to enable/disable the predict curve
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignGroup, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import { LabelColorIcon } from './LabelColorIcon.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import GraphType from '../model/GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class PredictEnabledRadioButtonGroup extends RectangularRadioButtonGroup<boolean> {

  public constructor( predictEnabledProperty: Property<boolean>, tandem: Tandem ) {

    const originalCurveLabelNode = new GraphTypeLabelNode( GraphType.ORIGINAL );

    // To give the labels the same effective size
    const alignGroup = new AlignGroup();

    const rectangularRadioButtonGroupItems: RectangularRadioButtonGroupItem<boolean>[] = [
      {
        value: false,
        createNode: () => new LabelColorIcon( originalCurveLabelNode, alignGroup, CalculusGrapherColors.originalCurveStrokeProperty ),
        tandemName: `originalCurve${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: true,
        createNode: tandem => {
          const text = new Text( CalculusGrapherStrings.predictStringProperty, {
            font: CalculusGrapherConstants.CONTROL_FONT,
            maxWidth: 50,
            tandem: tandem.createTandem( 'text' )
          } );
          return new LabelColorIcon( text, alignGroup, CalculusGrapherColors.predictCurveStrokeProperty );
        },
        tandemName: `predictCurve${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( predictEnabledProperty, rectangularRadioButtonGroupItems, {
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10,
        phetioVisiblePropertyInstrumented: false
      },
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'PredictEnabledRadioButtonGroup', PredictEnabledRadioButtonGroup );