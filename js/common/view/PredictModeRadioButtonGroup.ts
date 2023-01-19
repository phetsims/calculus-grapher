// Copyright 2022-2023, University of Colorado Boulder

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
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import { LabelColorIcon } from './LabelColorIcon.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import GraphType from '../model/GraphType.js';

type SelfOptions = EmptySelfOptions;

type PredictModeRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class PredictModeRadioButtonGroup extends RectangularRadioButtonGroup<boolean> {

  public constructor( predictModeEnabledProperty: Property<boolean>,
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

    const originalCurveLabelNode = new GraphTypeLabelNode( GraphType.ORIGINAL );

    const predictText = new Text( CalculusGrapherStrings.predictStringProperty, {
      font: CalculusGrapherConstants.CONTROL_FONT,
      maxWidth: 50
    } );

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
        createNode: () => new LabelColorIcon( predictText, alignGroup, CalculusGrapherColors.predictCurveStrokeProperty ),
        tandemName: `predictCurve${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( predictModeEnabledProperty, rectangularRadioButtonGroupItems, options );
  }
}

calculusGrapher.register( 'PredictModeRadioButtonGroup', PredictModeRadioButtonGroup );
