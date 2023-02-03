// Copyright 2023, University of Colorado Boulder

//TODO https://github.com/phetsims/calculus-grapher/issues/139 delete when we have real ScreenIcons
/**
 * CalculusGrapherScreenIcon is a ScreenIcon that shows the formulas for graphs that appear in a screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import { VBox } from '../../../../scenery/js/imports.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import GraphSet from '../model/GraphSet.js';

export default class CalculusGrapherScreenIcon extends ScreenIcon {
  public constructor( graphSets: GraphSet[] ) {

    // The unique set of GraphTypes in graphSets.
    const graphTypes = _.uniq( graphSets.map( graphSet => graphSet.graphTypes ).flat() );

    // The formulas for each GraphType, in a column.
    const iconNode = new VBox( {
      children: graphTypes.map( graphType => new GraphTypeLabelNode( graphType ) ),
      spacing: 10
    } );

    super( iconNode, {
      maxIconHeightProportion: 0.85
    } );
  }
}

calculusGrapher.register( 'CalculusGrapherScreenIcon', CalculusGrapherScreenIcon );