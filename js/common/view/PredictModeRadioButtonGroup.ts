// Copyright 2022, University of Colorado Boulder

/**
 * PredictModeRadioButtonGroup is the radio button group for turning predict mode on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { AlignGroup, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';
import PredictModeEnabledProperty from '../model/PredictModeEnabledProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import { LabelColorIcon } from './LabelColorIcon.js';

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
        createNode: tandem => new LabelColorIcon( originalCurveLabelNode, alignGroup, CalculusGrapherColors.originalCurveStrokeProperty ),
        tandemName: `fx${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: true,
        createNode: tandem => new LabelColorIcon( predictText, alignGroup, CalculusGrapherColors.predictCurveStrokeProperty ),
        tandemName: `predict${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( predictModeEnabledProperty, rectangularRadioButtonGroupItems, options );
  }
}

calculusGrapher.register( 'PredictModeRadioButtonGroup', PredictModeRadioButtonGroup );
