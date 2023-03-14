// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherCheckboxGroup is a group of checkboxes for controlling visibility of the grid lines and the reference line
 *
 * NOTE! This is not a subclass of VerticalCheckboxGroup for 2 important reasons:
 * (1) Subclasses need to add additional checkboxes, and VerticalCheckboxGroup does not support adding additional items.
 * (2) VerticalCheckboxGroup makes all checkboxes have pointer areas with uniform widths, and there's no way to
 *     opt-out of that behavior. That's a problem in the Lab screen, where turning on the 'Predict' preference will
 *     cause the GridCheckbox pointer areas to overlap with the ResetAllButton. So in this sim, having uniform pointer
 *     area widths is undesirable.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ReferenceLineCheckbox from './ReferenceLineCheckbox.js';
import GridCheckbox from './GridCheckbox.js';

export default class CalculusGrapherCheckboxGroup extends VBox {

  // For checkboxes added to this group, if their labels are RichText, they should use these max dimensions.
  // See https://github.com/phetsims/calculus-grapher/issues/283
  public static readonly RICH_TEXT_MAX_WIDTH = 100;
  public static readonly RICH_TEXT_MAX_HEIGHT = 40;

  public constructor( gridVisibleProperty: Property<boolean>, referenceLineVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const referenceLineCheckbox = new ReferenceLineCheckbox( referenceLineVisibleProperty,
      tandem.createTandem( 'referenceLineCheckbox' ) );

    const gridCheckbox = new GridCheckbox( gridVisibleProperty, tandem.createTandem( 'gridCheckbox' ) );

    super( {
      children: [ referenceLineCheckbox, gridCheckbox ],
      align: 'left',
      spacing: 10,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CalculusGrapherCheckboxGroup', CalculusGrapherCheckboxGroup );
