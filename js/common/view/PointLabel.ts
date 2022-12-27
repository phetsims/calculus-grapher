// Copyright 2022, University of Colorado Boulder

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
import AncillaryTools from '../model/AncillaryTools.js';
import FocusCircle, { FocusPointNodeOptions } from './FocusCircle.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Panel from '../../../../sun/js/Panel.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = {
  labelProperty: StringProperty;
  focusPointNodeOptions?: FocusPointNodeOptions;

  lineOptions?: LineOptions;
};

export type PointLabelOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class PointLabel extends Node {

  public constructor( ancillaryTools: AncillaryTools,
                      chartTransform: ChartTransform,
                      providedOptions: PointLabelOptions ) {

    const options = optionize<PointLabelOptions, SelfOptions, NodeOptions>()(
      {
        focusPointNodeOptions: {},
        lineOptions: {
          stroke: 'black',
          opacity: 0.5
        }
      }, providedOptions );

    // small point (disk) on curve - focusCircle is responsible for updating its position
    const focusCircle = new FocusCircle(
      ancillaryTools.xCoordinateProperty,
      ancillaryTools.originalProperty, chartTransform,
      options.focusPointNodeOptions );

    // label for the point
    const labelNode = new Panel( new Text( options.labelProperty, {
      font: CalculusGrapherConstants.POINT_LABEL_FONT,
      centerX: 0
    } ), {
      align: 'center',
      stroke: null,
      opacity: 0.5,
      fill: 'white'
    } );

    // line that connects the focus circle to the label
    const line = new Line( focusCircle.center, labelNode.center, options.lineOptions );

    // update the positions of the line and label Node
    // use some heuristic algorithm to prevent the label to overlap with the curve
    const updatePosition = () => {

      const tangent = ancillaryTools.tangentProperty.value;
      const modelPerpendicularTangent = Math.atan( tangent ) + Math.PI / 2;

      // unit vector perpendicular to tangent in view (hence the minus sign for the angle, since y is inverted)
      const perpendicular = Vector2.createPolar( 1, -modelPerpendicularTangent );

      const lineRelativeDisplacement = perpendicular.timesScalar( 10 );

      // point P2 for the line
      const P2 = focusCircle.center.plus( lineRelativeDisplacement );
      line.setPoint1( focusCircle.center );
      line.setPoint2( P2 );

      // position the label node in same direction as line, but further away
      labelNode.center = focusCircle.center.plus( lineRelativeDisplacement.timesScalar( 2 ) );
    };

    ancillaryTools.originalProperty.link( updatePosition );
    options.labelProperty.link( updatePosition );

    options.children = [ line, focusCircle, labelNode ];

    super( options );

    this.addLinkedElement( ancillaryTools, {
      tandem: options.tandem.createTandem( ancillaryTools.tandem.name )
    } );
  }
}
calculusGrapher.register( 'PointLabel', PointLabel );
