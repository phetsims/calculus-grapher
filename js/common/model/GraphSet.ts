// Copyright 2023-2026, University of Colorado Boulder

/**
 * GraphSet is an ordered set of GraphType. We need a serializable type for this so that we can maintain references
 * to specific instances when state is saved and restored.
 * See https://github.com/phetsims/calculus-grapher/issues/196
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import GraphType from './GraphType.js';

type SelfOptions = EmptySelfOptions;

type GraphSetOptions = SelfOptions & PickOptional<PhetioObjectOptions, 'phetioDocumentation' | 'tandem'>;

export default class GraphSet extends PhetioObject {

  // The unique set of GraphTypes that are part of this set, in the top-to-bottom order that they will be displayed.
  public readonly graphTypes: GraphType[];

  public constructor( graphTypes: GraphType[], providedOptions?: GraphSetOptions ) {
    affirm( graphTypes.length === _.uniq( graphTypes ).length, 'elements in the set must be unique' );

    super( optionize<GraphSetOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
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
   * Determines whether the specified set of GraphTypes matches this GraphSet exactly.
   */
  public matches( graphTypes: GraphType[] ): boolean {
    let matches = graphTypes.length === this.graphTypes.length;
    for ( let i = 0; matches && i < graphTypes.length; i++ ) {
      matches = this.graphTypes.includes( graphTypes[ i ] );
    }
    return matches;
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
   * https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   */
  public static readonly GraphSetIO = new IOType<IntentionalAny, IntentionalAny>( 'GraphSetIO', {
    valueType: GraphSet,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'An ordered set of graphs, to be displayed together in the user interface'
  } );
}

calculusGrapher.register( 'GraphSet', GraphSet );