// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Advanced' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import AdvancedModel from './model/AdvancedModel.js';
import AdvancedScreenView from './view/AdvancedScreenView.js';
import GraphType from '../common/model/GraphType.js';
import GraphSetRadioButtonGroup from '../common/view/GraphSetRadioButtonGroup.js';
import { AlignGroup, Circle, Line, Node, Path, VBox } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GraphSet from '../common/model/GraphSet.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Shape } from '../../../kite/js/imports.js';

export default class AdvancedScreen extends Screen<AdvancedModel, AdvancedScreenView> {

  public constructor( tandem: Tandem ) {

    const modelTandem = tandem.createTandem( 'model' );

    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.INTEGRAL, GraphType.ORIGINAL ], {
        tandem: modelTandem.createTandem( 'graphSet0' ),
        phetioDocumentation: 'Choosing this GraphSet shows the integral and original graphs.'
      } ),
      new GraphSet( [ GraphType.ORIGINAL, GraphType.DERIVATIVE ], {
        tandem: modelTandem.createTandem( 'graphSet1' ),
        phetioDocumentation: 'Choosing this GraphSet shows the original and derivative graphs.'
      } )
    ];

    const labelAlignGroup = new AlignGroup(); // to give labels the same effective size
    const graphSetRadioButtonGroupItems = [
      GraphSetRadioButtonGroup.createItem( graphSets[ 0 ], GraphType.INTEGRAL, labelAlignGroup ),
      GraphSetRadioButtonGroup.createItem( graphSets[ 1 ], GraphType.DERIVATIVE, labelAlignGroup )
    ];

    const createModel = () => new AdvancedModel( {
      graphSets: graphSets,
      graphSet: graphSets[ 1 ],
      tandem: modelTandem
    } );

    const createView = ( model: AdvancedModel ) => new AdvancedScreenView( model, {
      graphSetRadioButtonGroupItems: graphSetRadioButtonGroupItems,
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.advancedStringProperty,
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

  const lineWidth = 2;
  const triangleWidth = 40;
  const triangleHeight = 10;
  const discontinuityPointRadius = 2;

  const triangleShape = new Shape()
    .moveTo( 0, 0 )
    .lineTo( triangleWidth / 2, -triangleHeight )
    .lineTo( triangleWidth, 0 );
  const trianglePath = new Path( triangleShape, {
    stroke: CalculusGrapherColors.originalCurveStrokeProperty,
    lineWidth: lineWidth
  } );
  const leftLine = new Line( 0, 0, triangleWidth / 2, 0, {
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
    lineWidth: lineWidth
  } );
  const rightLine = new Line( triangleWidth / 2, triangleHeight, triangleWidth, triangleHeight, {
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
    lineWidth: lineWidth
  } );
  const leftDiscontinuityPoint = new Circle( {
    x: triangleWidth / 2,
    y: 0,
    radius: discontinuityPointRadius,
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
    fill: CalculusGrapherColors.screenBackgroundColorProperty,
    lineWidth: lineWidth
  } );
  const rightDiscontinuityPoint = new Circle( {
    x: triangleWidth / 2,
    y: triangleHeight,
    radius: discontinuityPointRadius,
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
    fill: CalculusGrapherColors.screenBackgroundColorProperty,
    lineWidth: lineWidth
  } );
  const derivativeNode = new Node( {
    children: [ leftLine, rightLine, leftDiscontinuityPoint, rightDiscontinuityPoint ]
  } );
  const iconNode = new VBox( {
    children: [ trianglePath, derivativeNode ],
    spacing: 5
  } );
  return new ScreenIcon( iconNode, {
    fill: CalculusGrapherColors.screenBackgroundColorProperty
  } );
}

calculusGrapher.register( 'AdvancedScreen', AdvancedScreen );
