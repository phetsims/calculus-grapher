// Copyright 2023, University of Colorado Boulder

/**
 * LabeledLinesNode is the set of LabeledLineNode instances. Those instances are not instrumented for PhET-iO,
 * because everything that the PhET-iO client can change is in the model. So this class also provides a link to
 * the collection of LabeledLine instances in the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import LabeledLine from '../model/LabeledLine.js';
import LabeledLineNode from './LabeledLineNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import LinkableElement from '../../../../tandem/js/LinkableElement.js';

export default class LabeledLinesNode extends Node {

  public readonly verticalLineNodes: LabeledLineNode[];

  public constructor( verticalLines: LabeledLine[], linkableElement: LinkableElement,
                      chartTransform: ChartTransform, tandem: Tandem ) {

    // LabeledLineNode instances.
    // Opt out of PhET-iO instrumentation, see https://github.com/phetsims/calculus-grapher/issues/198
    const verticalLineNodes = verticalLines.map( verticalLine =>
      new LabeledLineNode( verticalLine, chartTransform, Tandem.OPT_OUT ) );

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

calculusGrapher.register( 'LabeledLinesNode', LabeledLinesNode );