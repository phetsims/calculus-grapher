// Copyright 2022, University of Colorado Boulder

/**
 * CalculusGrapherCheckboxGroup is a group of checkboxes for controlling visibility of graph nodes
 *
 * @author Martin Veillette
 */

import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import CurveLabelsNode from './CurveLabelsNode.js';
import { Node } from '../../../../scenery/js/imports.js';

type SelfOptions = {
  isGraphCheckboxIncluded?: {
    integralGraph: boolean;
    derivativeGraph: boolean;
    originalGraph?: boolean;
    secondDerivativeGraph: boolean;
  };
};

export type CalculusGrapherCheckboxGroupOptions = SelfOptions & VerticalCheckboxGroupOptions;

export default class CalculusGrapherCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: CalculusGrapherCheckboxGroupOptions ) {

    const options = optionize<CalculusGrapherCheckboxGroupOptions, SelfOptions, VerticalCheckboxGroupOptions>()(
      {
        isGraphCheckboxIncluded: {
          integralGraph: true,
          originalGraph: false,
          derivativeGraph: true,
          secondDerivativeGraph: false
        }
      }, providedOptions );


    // content array for checkbox items
    const items: VerticalCheckboxGroupItem[] = [];

    if ( options.isGraphCheckboxIncluded.integralGraph ) {

      // Item for integral checkbox
      const integralItem = createItem(
        CurveLabelsNode.getIntegralLabel(),
        visibleProperties.integralGraphNodeVisibleProperty, {
          tandemName: 'integralGraphNodeCheckbox'
        } );

      items.push( integralItem );
    }

    if ( options.isGraphCheckboxIncluded.originalGraph ) {

      // Item for original function checkbox
      const originalItem = createItem(
        CurveLabelsNode.getOriginalLabel(),
        visibleProperties.originalGraphNodeVisibleProperty, {
          tandemName: 'originalGraphNodeCheckbox'
        } );

      items.push( originalItem );
    }

    if ( options.isGraphCheckboxIncluded.derivativeGraph ) {

      // Item for first Derivative checkbox
      const derivativeItem = createItem(
        CurveLabelsNode.getDerivativeLabel(),
        visibleProperties.derivativeGraphNodeVisibleProperty, {
          tandemName: 'derivativeGraphNodeCheckbox'
        } );

      items.push( derivativeItem );
    }


    if ( options.isGraphCheckboxIncluded.secondDerivativeGraph ) {

      // Item for second Derivative checkbox
      const secondDerivativeItem = createItem(
        CurveLabelsNode.getSecondDerivativeLabel(),
        visibleProperties.secondDerivativeGraphNodeVisibleProperty, {
          tandemName: 'secondDerivativeGraphNodeCheckbox'
        } );

      items.push( secondDerivativeItem );
    }

    super( items, options );
  }
}

type ItemOptions = PickRequired<VerticalCheckboxGroupItem, 'tandemName'> & PickOptional<VerticalCheckboxGroupItem, 'options'>;

function createItem( labelNode: Node,
                     property: Property<boolean>,
                     providedOptions: ItemOptions ): VerticalCheckboxGroupItem {

  return {
    createNode: tandem => {
      return labelNode;
    },
    property: property,
    options: providedOptions.options,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'CalculusGrapherCheckboxGroup', CalculusGrapherCheckboxGroup );
