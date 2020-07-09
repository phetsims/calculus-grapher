// Copyright 2020, University of Colorado Boulder

/**
 * Enumeration of the possible 'modes' of manipulating curves.
 *
 * @author Brandon Li
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import calculusGrapher from '../../calculusGrapher.js';

const CurveManipulationModes = Enumeration.byKeys( [

  // TODO document this.
  'HILL',
  'LINE',
  'PEDESTAL',
  'PARABOLA',
  'SINE',
  'FREEFORM',
  'TILT',
  'SHIFT'

] );

calculusGrapher.register( 'CurveManipulationModes', CurveManipulationModes );
export default CurveManipulationModes;

