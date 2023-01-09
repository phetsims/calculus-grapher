// Copyright 2022-2023, University of Colorado Boulder

/**
 * PointLabel is a point on originalCurve, with a label. The point and the label are connected by a small line
 * The label (and line) update their positions, and are set perpendicular to the tangent of the curve
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Line, LineOptions, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import LabelledAncillaryTool from '../model/LabelledAncillaryTool.js';
import FocusCircle, { FocusPointNodeOptions } from './FocusCircle.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { getDerivativeOf, GraphType } from '../model/GraphType.js';
import BackgroundNode, { BackgroundNodeOptions } from '../../../../scenery-phet/js/BackgroundNode.js';

type SelfOptions = {
  focusPointNodeOptions?: FocusPointNodeOptions;

  lineOptions?: LineOptions;

  labelNodeOptions?: BackgroundNodeOptions;
};

export type PointLabelOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class PointLabel extends Node {

  public constructor( labelledAncillaryTool: LabelledAncillaryTool,
                      graphType: GraphType,
                      chartTransform: ChartTransform,
                      providedOptions: PointLabelOptions ) {

    const options = optionize<PointLabelOptions, SelfOptions, NodeOptions>()(
      {
        focusPointNodeOptions: {},
        lineOptions: {
          stroke: 'black',
          opacity: 0.5,
          visible: false
        },
        labelNodeOptions: {
          rectangleOptions: {
            cornerRadius: 3
          }
        }
      }, providedOptions );

    // property associated with y value
    const yProperty = labelledAncillaryTool.getYProperty( graphType );

    // property associated with the tangent at the y value
    const yDerivativeProperty = labelledAncillaryTool.getYProperty( getDerivativeOf( graphType ) );

    // small point (disk) on curve - focusCircle is responsible for updating its position
    const focusCircle = new FocusCircle(
      labelledAncillaryTool.xProperty,
      yProperty, chartTransform,
      options.focusPointNodeOptions );

    // label for the point

    const textNode = new Text( labelledAncillaryTool.labelProperty, {
      font: CalculusGrapherConstants.POINT_LABEL_FONT,
      maxWidth: 50
    } );

    const labelNode = new BackgroundNode( textNode, options.labelNodeOptions );

    // line that connects the focus circle to the label
    const line = new Line( focusCircle.center, labelNode.center, options.lineOptions );

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
      labelNode.center = focusCircle.center.plus( lineRelativeDisplacement.timesScalar( 1 ) );
    };

    yProperty.link( updatePosition );

    labelledAncillaryTool.labelProperty.link( updatePosition );

    options.children = [ line, focusCircle, labelNode ];

    super( options );

    this.addLinkedElement( labelledAncillaryTool, {
      tandem: options.tandem.createTandem( labelledAncillaryTool.tandem.name )
    } );
  }
}
calculusGrapher.register( 'PointLabel', PointLabel );
