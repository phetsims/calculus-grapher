// Copyright 2022, University of Colorado Boulder

/**
 * CalculusGrapherCheckboxGroup is a group of checkboxes for controlling visibility of graph nodes
 *
 * @author Martin Veillette
 */

import { Text } from '../../../../scenery/js/imports.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';

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
        CalculusGrapherStrings.checkbox.integralStringProperty,
        visibleProperties.integralGraphNodeVisibleProperty, {
          tandemName: 'integralGraphNodeCheckbox'
        } );

      items.push( integralItem );
    }

    if ( options.isGraphCheckboxIncluded.originalGraph ) {

      // Item for original function checkbox
      const originalItem = createItem(
        CalculusGrapherStrings.checkbox.originalStringProperty,
        visibleProperties.originalGraphNodeVisibleProperty, {
          tandemName: 'originalGraphNodeCheckbox'
        } );

      items.push( originalItem );
    }

    if ( options.isGraphCheckboxIncluded.derivativeGraph ) {

      // Item for first Derivative checkbox
      const derivativeItem = createItem(
        CalculusGrapherStrings.checkbox.derivativeStringProperty,
        visibleProperties.derivativeGraphNodeVisibleProperty, {
          tandemName: 'derivativeGraphNodeCheckbox'
        } );

      items.push( derivativeItem );
    }


    if ( options.isGraphCheckboxIncluded.secondDerivativeGraph ) {

      // Item for second Derivative checkbox
      const secondDerivativeItem = createItem(
        CalculusGrapherStrings.checkbox.secondDerivativeStringProperty,
        visibleProperties.secondDerivativeGraphNodeVisibleProperty, {
          tandemName: 'secondDerivativeGraphNodeCheckbox'
        } );

      items.push( secondDerivativeItem );
    }

    super( items, options );
  }
}

type ItemOptions = PickRequired<VerticalCheckboxGroupItem, 'tandemName'> & PickOptional<VerticalCheckboxGroupItem, 'options'>;

function createItem( labelStringProperty: TReadOnlyProperty<string>,
                     property: Property<boolean>,
                     providedOptions: ItemOptions ): VerticalCheckboxGroupItem {

  return {
    createNode: tandem => {
      return new Text( labelStringProperty, { tandem: tandem.createTandem( 'labelText' ) } );
    },
    property: property,
    options: providedOptions.options,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'CalculusGrapherCheckboxGroup', CalculusGrapherCheckboxGroup );
