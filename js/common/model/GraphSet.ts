// Copyright 2023, University of Colorado Boulder

/**
 * GraphSet is an ordered set of GraphType. We need a serializable type for this so that we can maintain references
 * to specific instances when state is saved and restored.
 * See https://github.com/phetsims/calculus-grapher/issues/196
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import GraphType from './GraphType.js';
import calculusGrapher from '../../calculusGrapher.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

type GraphSetOptions = SelfOptions & PickOptional<PhetioObject, 'phetioDocumentation' | 'tandem'>;

export default class GraphSet extends PhetioObject {

  // The unique set of GraphTypes that are part of this set, in the top-to-bottom order that they will be displayed.
  public readonly graphTypes: GraphType[];

  public constructor( graphTypes: GraphType[], providedOptions?: GraphSetOptions ) {
    assert && assert( graphTypes.length === _.uniq( graphTypes ).length, 'elements in the set must be unique' );

    super( optionize<GraphSetOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      tandem: Tandem.OPT_OUT,
      phetioState: false,
      phetioType: GraphSet.GraphSetIO
    }, providedOptions ) );

    this.graphTypes = graphTypes;
  }

  /**
   * Gets the number of GraphTypes in this GraphSet.
   */
  public get length(): number { return this.graphTypes.length; }

  /**
   * Determines whether this GraphSet includes a specific GraphType.
   */
  public includes( graphType: GraphType ): boolean {
    return this.graphTypes.includes( graphType );
  }

  /**
   * Given an array of GraphSet, does it include a specific GraphType.
   */
  public static includes( graphSets: GraphSet[], graphType: GraphType ): boolean {
    return !!_.find( graphSets, graphSet => graphSet.includes( graphType ) );
  }

  /**
   * GraphSetIO handles PhET-iO serialization of GraphSet.
   * It implements 'Reference type serialization', as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/master/doc/phet-io-instrumentation-technical-guide.md#serialization
   */
  public static readonly GraphSetIO = new IOType( 'GraphSetIO', {
    valueType: GraphSet,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'An ordered set of graphs, to be displayed together in the user interface'
  } );
}

calculusGrapher.register( 'GraphSet', GraphSet );