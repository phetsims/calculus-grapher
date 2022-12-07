// Copyright 2022, University of Colorado Boulder

/**
 * PredictModeRadioButtonGroup is the radio button group for turning predict mode on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { AlignBox, AlignGroup, Line, Node, TColor, Text, VBox } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';
import PredictModeEnabledProperty from '../model/PredictModeEnabledProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

type SelfOptions = EmptySelfOptions;

export type PredictModeRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class PredictModeRadioButtonGroup extends RectangularRadioButtonGroup<boolean> {

  public constructor( predictModeEnabledProperty: PredictModeEnabledProperty,
                      providedOptions: PredictModeRadioButtonGroupOptions ) {

    const options = optionize<PredictModeRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10
      }
    }, providedOptions );

    const originalCurveLabelNode = new GraphTypeLabelNode( 'original' );

    const predictText = new Text( CalculusGrapherStrings.predictStringProperty, {
      font: new PhetFont( 12 )
    } );

    // To give the labels the same effective size
    const alignGroup = new AlignGroup();

    const rectangularRadioButtonGroupItems: RectangularRadioButtonGroupItem<boolean>[] = [
      {
        value: false,
        createNode: tandem => new PredictModeRadioButtonIcon( originalCurveLabelNode, alignGroup, CalculusGrapherColors.originalCurveStrokeProperty ),
        tandemName: `fx${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: true,
        createNode: tandem => new PredictModeRadioButtonIcon( predictText, alignGroup, CalculusGrapherColors.predictCurveStrokeProperty ),
        tandemName: `predict${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( predictModeEnabledProperty, rectangularRadioButtonGroupItems, options );
  }
}

/**
 * Icons for the radio buttons.
 * Note that there's a bit of duplication here with GraphTypeIcon, but it feels acceptable.
 */
class PredictModeRadioButtonIcon extends VBox {

  public constructor( labelNode: Node, labelAlignGroup: AlignGroup, stroke: TColor ) {

    const alignBox = new AlignBox( labelNode, {
      group: labelAlignGroup
    } );

    // Horizontal line showing the color that is used to stroke the curve associated with predict mode.
    const colorLine = new Line( 0, 0, 40, 0, {
      stroke: stroke,
      lineWidth: 3
    } );

    super( {
      children: [ alignBox, colorLine ],
      spacing: 7,
      align: 'center'
    } );
  }
}

calculusGrapher.register( 'PredictModeRadioButtonGroup', PredictModeRadioButtonGroup );
