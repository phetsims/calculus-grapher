// Copyright 2023, University of Colorado Boulder

/**
 * GraphSet is an ordered set of GraphType. We need a serializable type for this so that we can maintain references
 * to specific instances when state is saved and restored.
 * See https://github.com/phetsims/calculus-grapher/issues/196
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GraphType from './GraphType.js';
import calculusGrapher from '../../calculusGrapher.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import EnumerationIO from '../../../../tandem/js/types/EnumerationIO.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';

type GraphSetStateObject = {
  graphTypes: GraphType[];
} & ReferenceIOState;

export default class GraphSet extends PhetioObject {

  public readonly graphTypes: GraphType[];
  public static readonly TANDEM_NAME_PREFIX = 'graphSet';

  public constructor( graphTypes: GraphType[], tandem?: Tandem ) {
    assert && assert( graphTypes.length === _.uniq( graphTypes ).length, 'elements in the set must be unique' );

    super( {
      tandem: tandem ? tandem : Tandem.OPT_OUT,
      phetioState: false,
      phetioType: GraphSet.GraphSetIO
    } );

    this.graphTypes = graphTypes;
  }

  public get length(): number { return this.graphTypes.length; }

  public includes( graphType: GraphType ): boolean {
    return this.graphTypes.includes( graphType );
  }

  /**
   * Given an array of GraphSet, return the unique array of GraphType that it contains.
   */
  public static getGraphTypes( graphSets: GraphSet[] ): GraphType[] {
    const graphTypes: GraphType[] = [];
    graphSets.forEach( graphSet => graphTypes.push( ...graphSet.graphTypes ) );
    return _.uniq( graphTypes );
  }

  /**
   * Given an array of GraphSet, does it contain a specific GraphType.
   */
  public static includes( graphSets: GraphSet[], graphType: GraphType ): boolean {
    return !!_.find( graphSets, graphSet => graphSet.includes( graphType ) );
  }

  /**
   * Serializes this object for PhET-iO.
   */
  private toStateObject(): GraphSetStateObject {
    const graphSetReference = ReferenceIO( IOType.ObjectIO ).toStateObject( this );
    graphSetReference.graphTypes = ArrayIO( EnumerationIO( GraphType ) ).toStateObject( this.graphTypes );
    return graphSetReference;
  }

  /**
   * GraphSetIO handles PhET-iO serialization of GraphSet.
   * It implements 'Reference type serialization', as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/master/doc/phet-io-instrumentation-technical-guide.md#serialization
   * It adds graphTypes to the default ReferenceIO implementation because we want graphTypes to be displayed
   * in Studio.
   */
  public static readonly GraphSetIO = new IOType( 'GraphSetIO', {
    valueType: GraphSet,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'An ordered set of graph types',
    stateSchema: {
      graphTypes: ArrayIO( EnumerationIO( GraphType ) )
    },
    toStateObject: graphSet => graphSet.toStateObject()
  } );
}

calculusGrapher.register( 'GraphSet', GraphSet );