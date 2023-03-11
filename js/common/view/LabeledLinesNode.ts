// Copyright 2023, University of Colorado Boulder

/**
 * LabeledLinesNode is the set of LabeledLineNode instances. Those instances are not instrumented for PhET-iO,
 * because everything that the PhET-iO client can change is in the model. So this class also provides a link to
 * the collection of LabeledLine instances in the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import LabeledLine from '../model/LabeledLine.js';
import LabeledLineNode, { LabeledLineNodeOptions } from './LabeledLineNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import LinkableElement from '../../../../tandem/js/LinkableElement.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  labeledLineOptions?: LabeledLineNodeOptions; // propagated to LabeledLineNode
};

type LabeledLinesNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class LabeledLinesNode extends Node {

  public readonly labeledLineNodes: LabeledLineNode[];

  public constructor( labeledLines: LabeledLine[], labeledLinesLinkableElement: LinkableElement,
                      chartTransform: ChartTransform, providedOptions: LabeledLinesNodeOptions ) {

    const options = optionize<LabeledLinesNodeOptions, StrictOmit<SelfOptions, 'labeledLineOptions'>, NodeOptions>()( {

      // NodeOptions
      pickable: false, // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    // LabeledLineNode instances are not instrumented. The entire PhET-iO API lives in the model.
    // See model.tools.labeledLines and https://github.com/phetsims/calculus-grapher/issues/198
    const labeledLineNodes = labeledLines.map( labeledLine =>
      new LabeledLineNode( labeledLine, chartTransform, options.labeledLineOptions ) );

    options.children = labeledLineNodes;

    super( options );

    this.labeledLineNodes = labeledLineNodes;

    // Link to model.tools.labeledLines
    this.addLinkedElement( labeledLinesLinkableElement, {
      tandem: options.tandem.createTandem( 'labeledLines' )
    } );
  }
}

calculusGrapher.register( 'LabeledLinesNode', LabeledLinesNode );