// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Derivative Lab' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import DerivativeModel from './model/DerivativeModel.js';
import DerivativeScreenView from './view/DerivativeScreenView.js';
import GraphType from '../common/model/GraphType.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GraphSet from '../common/model/GraphSet.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { AlignBox, AlignGroup, Line, VBox } from '../../../scenery/js/imports.js';
import GraphTypeLabelNode from '../common/view/GraphTypeLabelNode.js';

export default class DerivativeScreen extends Screen<DerivativeModel, DerivativeScreenView> {

  public static readonly SCREEN_ICON_EXPRESSION_ALIGN_GROUP = new AlignGroup();

  public constructor( tandem: Tandem ) {

    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.ORIGINAL, GraphType.DERIVATIVE ] )
    ];

    const createModel = () => new DerivativeModel( {
      graphSets: graphSets,
      tandem: tandem.createTandem( 'model' )
    } );

    const createView = ( model: DerivativeModel ) => new DerivativeScreenView( model, {
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.derivativeStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    } );
  }
}

/**
 * Creates the icon for this screen.
 */
function createScreenIcon(): ScreenIcon {
  const xWidth = 50;
  const expressionNode = new AlignBox( new GraphTypeLabelNode( GraphType.DERIVATIVE ), {
    group: DerivativeScreen.SCREEN_ICON_EXPRESSION_ALIGN_GROUP
  } );
  const curveNode = new Line( 0, 0, xWidth, 0, {
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
    lineWidth: 2
  } );
  const iconNode = new VBox( {
    children: [ expressionNode, curveNode ],
    spacing: 5
  } );
  return new ScreenIcon( iconNode, {
    fill: CalculusGrapherColors.screenBackgroundColorProperty,
    maxIconWidthProportion: 0.65
  } );
}

calculusGrapher.register( 'DerivativeScreen', DerivativeScreen );
