// Copyright 2020, University of Colorado Boulder

/**
 * Enumeration of the possible 'types' of curves in the 'Calculus Grapher' sim.
 *
 * @author Brandon Li
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import calculusGrapher from '../../calculusGrapher.js';

const CurveTypes = Enumeration.byKeys( [

  // TODO document this.
  'INTEGRAL',
  'ORIGINAL',
  'DERIVATIVE',
  'SECOND_DERIVATIVE'

] );

calculusGrapher.register( 'CurveTypes', CurveTypes );
export default CurveTypes;