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
    'titleProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'intro': string;
    'introProperty': TReadOnlyProperty<string>;
    'derivativeLab': string;
    'derivativeLabProperty': TReadOnlyProperty<string>;
    'integralLab': string;
    'integralLabProperty': TReadOnlyProperty<string>;
  };
  'reset': string;
  'resetProperty': TReadOnlyProperty<string>;
  'smooth': string;
  'smoothProperty': TReadOnlyProperty<string>;
};

const calculusGrapherStrings = getStringModule( 'CALCULUS_GRAPHER' ) as StringsType;

calculusGrapher.register( 'calculusGrapherStrings', calculusGrapherStrings );

export default calculusGrapherStrings;
