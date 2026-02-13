// Copyright 2022-2026, University of Colorado Boulder

/**
 * PredictRadioButtonGroup is the radio button group for choosing either the original or predict curve.
 * The group is visible only if the Predict preference is turned on, which shows UI features related to Predict.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import GraphType from '../model/GraphType.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import { LabelColorIcon } from './LabelColorIcon.js';

export default class PredictRadioButtonGroup extends RectangularRadioButtonGroup<boolean> {

  public constructor( predictSelectedProperty: Property<boolean>, tandem: Tandem ) {

    const originalCurveLabelNode = new GraphTypeLabelNode( GraphType.ORIGINAL );

    // To give the labels the same effective size
    const alignGroup = new AlignGroup();

    const rectangularRadioButtonGroupItems: RectangularRadioButtonGroupItem<boolean>[] = [
      {
        value: false,
        createNode: () => new LabelColorIcon( originalCurveLabelNode, alignGroup, CalculusGrapherColors.originalCurveStrokeProperty ),
        tandemName: 'originalCurveRadioButton',
        options: {
          accessibleName: CalculusGrapherFluent.a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleName.createProperty( {
            variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
          } ),
          accessibleHelpText: CalculusGrapherFluent.a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty
        }
      },
      {
        value: true,
        createNode: tandem => {
          const text = new Text( CalculusGrapherFluent.predictStringProperty, {
            font: CalculusGrapherConstants.CONTROL_FONT,
            maxWidth: 50,
            tandem: tandem.createTandem( 'text' )
          } );
          return new LabelColorIcon( text, alignGroup, CalculusGrapherColors.predictCurveStrokeProperty );
        },
        tandemName: 'predictCurveRadioButton',
        options: {
          accessibleName: CalculusGrapherFluent.a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty,
          accessibleHelpText: CalculusGrapherFluent.a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty
        }
      }
    ];

    super( predictSelectedProperty, rectangularRadioButtonGroupItems, {
      isDisposable: false,
      visibleProperty: CalculusGrapherPreferences.predictFeatureEnabledProperty,
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10,
        phetioVisiblePropertyInstrumented: false
      },
      accessibleName: CalculusGrapherFluent.a11y.predictRadioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'PredictRadioButtonGroup', PredictRadioButtonGroup );