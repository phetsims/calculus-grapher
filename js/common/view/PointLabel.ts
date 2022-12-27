// Copyright 2022, University of Colorado Boulder

/**
 * PointLabel is a label for Point
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

    const focusCircle = new FocusCircle( ancillaryTools.xCoordinateProperty,
      ancillaryTools.originalProperty, chartTransform,
      options.focusPointNodeOptions );

    const textNode = new Text( options.labelProperty, {
      font: CalculusGrapherConstants.POINT_LABEL_FONT,
      centerX: 0
    } );

    const labelNode = new Panel( textNode, {
      centerX: focusCircle.x,
      centerY: focusCircle.y,
      align: 'center',
      stroke: null,
      opacity: 0.5,
      fill: 'white'
    } );

    const line = new Line( focusCircle.center, labelNode.center, options.lineOptions );

    ancillaryTools.originalProperty.link( value => {
      const tangent = ancillaryTools.tangentProperty.value;
      const angle = Math.atan( tangent ) + Math.PI / 2;
      const distance = 20;
      labelNode.centerX = focusCircle.x + distance * Math.cos( angle );
      labelNode.centerY = focusCircle.y - distance * Math.sin( angle );

      // TODO: remove magic constants
      const P2 = focusCircle.center.plusXY( 1.2 * distance / 2 * Math.cos( angle ), -distance / 2 * Math.sin( angle ) );

      line.setPoint1( focusCircle.center );
      line.setPoint2( P2 );
    } );

    options.labelProperty.link( () => {
      labelNode.centerX = focusCircle.x;
    } );

    options.children = [ line, focusCircle, labelNode ];

    super( options );

    // add linked elements
    ancillaryTools.addLinkedElements( this, options.tandem.createTandem( 'model' ) );
  }
}
calculusGrapher.register( 'PointLabel', PointLabel );
