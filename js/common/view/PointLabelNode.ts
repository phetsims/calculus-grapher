// Copyright 2022-2023, University of Colorado Boulder

/**
 * PointLabelNode is a point on originalCurve, with a label. The point and the label are connected by a small line
 * The label (and line) update their positions, and are set perpendicular to the tangent of the curve
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { ColorProperty, Line, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import LabelledAncillaryTool from '../model/LabelledAncillaryTool.js';
import FocusCircle from './FocusCircle.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { getDerivativeOf, GraphType } from '../model/GraphType.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Multilink from '../../../../axon/js/Multilink.js';

type SelfOptions = EmptySelfOptions;

type PointLabelNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class PointLabelNode extends Node {

  public constructor( pointLabel: LabelledAncillaryTool,
                      graphType: GraphType,
                      chartTransform: ChartTransform,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      providedOptions: PointLabelNodeOptions ) {

    const options = optionize<PointLabelNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty(
        [ pointLabel.visibleProperty, predictModeEnabledProperty ],
        ( pointLabelVisible, predictMode ) => pointLabelVisible && !predictMode, {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    // property associated with y value
    const yProperty = pointLabel.getYProperty( graphType );

    // property associated with the tangent at the y value
    const yDerivativeProperty = pointLabel.getYProperty( getDerivativeOf( graphType ) );

    const colorProperty = new ColorProperty( CalculusGrapherColors.originalCurveStrokeProperty.value, {
      tandem: options.tandem.createTandem( 'colorProperty' )
    } );

    // small point (disk) on curve - focusCircle is responsible for updating its position
    const focusCircle = new FocusCircle( pointLabel.xProperty, yProperty, chartTransform, {
      fill: colorProperty
    } );

    // label for the point
    const text = new Text( pointLabel.labelProperty, {
      font: CalculusGrapherConstants.POINT_LABEL_FONT,
      maxWidth: 50
    } );

    const labelNode = new BackgroundNode( text, {
      rectangleOptions: {
        cornerRadius: 3
      }
    } );

    // line that connects the focus circle to the label
    //TODO https://github.com/phetsims/calculus-grapher/issues/151 delete line, vestigial
    const line = new Line( focusCircle.center, labelNode.center, {
      stroke: 'rgba( 0, 0, 0, 0.5 )',
      visible: false
    } );

    // update the positions of the line and label Node
    // use some heuristic algorithm to prevent the label to overlap with the curve
    const updatePosition = () => {

      const tangent = yDerivativeProperty.value;
      const modelPerpendicularTangent = Math.atan( tangent ) + Math.PI / 2;

      // unit vector perpendicular to tangent in view (hence the minus sign for the angle, since y is inverted)
      const perpendicular = Vector2.createPolar( 1, -modelPerpendicularTangent );

      const lineRelativeDisplacement = perpendicular.timesScalar( 10 );

      // point P2 for the line
      const P2 = focusCircle.center.plus( lineRelativeDisplacement );
      line.setPoint1( focusCircle.center );
      line.setPoint2( P2 );

      // position the label node in same direction as line, but further away
      //TODO https://github.com/phetsims/calculus-grapher/issues/151 delete timesScalar, unnecessary
      labelNode.center = focusCircle.center.plus( lineRelativeDisplacement.timesScalar( 1 ) );
    };

    Multilink.multilink( [ pointLabel.xProperty, yProperty, pointLabel.labelProperty ], () => updatePosition() );

    options.children = [ line, focusCircle, labelNode ];

    super( options );

    this.addLinkedElement( pointLabel, {
      tandem: options.tandem.createTandem( pointLabel.tandem.name )
    } );
  }
}
calculusGrapher.register( 'PointLabelNode', PointLabelNode );