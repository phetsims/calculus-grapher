// Copyright 2023, University of Colorado Boulder

/**
 * VerticalLinesNode is the set of VerticalLineNode instances. Those instances are not instrumented for PhET-iO,
 * because everything that the PhET-iO client can change is in the model. So this class also provides a link to
 * the collection of VerticalLine instances in the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import VerticalLine from '../model/VerticalLine.js';
import VerticalLineNode from './VerticalLineNode.js';
import { LinkableElement } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';

export default class VerticalLinesNode extends Node {

  public readonly verticalLineNodes: VerticalLineNode[];

  public constructor( verticalLines: VerticalLine[], linkableElement: LinkableElement,
                      chartTransform: ChartTransform, tandem: Tandem ) {

    // VerticalLineNode instances
    const verticalLineNodes = verticalLines.map( verticalLine =>
      new VerticalLineNode( verticalLine, chartTransform, {
        tandem: Tandem.OPT_OUT // see https://github.com/phetsims/calculus-grapher/issues/198
      } ) );

    super( {
      children: verticalLineNodes,
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    } );

    this.verticalLineNodes = verticalLineNodes;

    // Link to model.tools.verticalLines
    this.addLinkedElement( linkableElement, {
      tandem: tandem.createTandem( 'verticalLines' )
    } );
  }
}

calculusGrapher.register( 'VerticalLinesNode', VerticalLinesNode );