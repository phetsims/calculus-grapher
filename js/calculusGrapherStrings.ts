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
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'intro': string;
    'introStringProperty': TReadOnlyProperty<string>;
    'derivativeLab': string;
    'derivativeLabStringProperty': TReadOnlyProperty<string>;
    'integralLab': string;
    'integralLabStringProperty': TReadOnlyProperty<string>;
  };
  'reset': string;
  'resetStringProperty': TReadOnlyProperty<string>;
  'smooth': string;
  'smoothStringProperty': TReadOnlyProperty<string>;
};

const calculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'calculusGrapherStrings', calculusGrapherStrings );

export default calculusGrapherStrings;
