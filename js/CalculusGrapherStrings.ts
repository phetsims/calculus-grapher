// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import calculusGrapher from './calculusGrapher.js';

type StringsType = {
  'calculus-grapher': {
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'introStringProperty': TReadOnlyProperty<string>;
    'derivativeLabStringProperty': TReadOnlyProperty<string>;
    'integralLabStringProperty': TReadOnlyProperty<string>;
  };
  'resetStringProperty': TReadOnlyProperty<string>;
  'smoothStringProperty': TReadOnlyProperty<string>;
};

const CalculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'CalculusGrapherStrings', CalculusGrapherStrings );

export default CalculusGrapherStrings;
