// Copyright 2023, University of Colorado Boulder

/**
 * GraphSetsAnimator handles the animation between 2 GraphSets. The animation consists of a sequence of 3 steps:
 * (1) Fade out nodes that are not included in the new GraphSet.
 * (2) Move nodes to their new positions
 * (3) Fade in nodes that are new to the new GraphSet.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import GraphNode from './GraphNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const STEPPER = null; // step method must be called by the client
const OPACITY_DURATION = 0.5; // duration of opacity animation, in seconds
const TRANSLATION_DURATION = 0.5; // duration of translation animation, in seconds
const TINY_DURATION = 0.001;

export default class GraphSetsAnimator {

  // For animating opacity of a Node
  private readonly fadeOutOpacityProperty: NumberProperty;
  private readonly fadeInOpacityProperty: NumberProperty;

  // For animating translation, this is the percentage of distance between a start point and end point
  private readonly percentDistanceProperty: NumberProperty;

  // Animation for each piece of the animation sequence. These are null when animation is not running.
  private fadeOutAnimation: Animation | null;
  private fadeInAnimation: Animation | null;
  private translationAnimation: Animation | null;

  // The Animation instance that is currently running, and should therefore be advanced by the step method.
  private activeAnimation: Animation | null;

  public constructor( tandem: Tandem ) {

    this.fadeOutOpacityProperty = new NumberProperty( 1, {
      isValidValue: opacity => ( opacity >= 0 && opacity <= 1 )
    } );

    this.fadeInOpacityProperty = new NumberProperty( 0, {
      isValidValue: opacity => ( opacity >= 0 && opacity <= 1 )
    } );

    this.percentDistanceProperty = new NumberProperty( 0, {
      isValidValue: opacity => ( opacity >= 0 && opacity <= 1 )
    } );

    this.fadeOutAnimation = null;
    this.fadeInAnimation = null;
    this.translationAnimation = null;
    this.activeAnimation = null;
  }

  /**
   * Switches between 2 graph sets.
   * @param graphSetNode - parent Node for the GraphNodes
   * @param oldGraphNodes - the current children of graphSetNode, null if it has no children
   * @param newGraphNodes - the new children of graphSetNode
   * @param chartRectangleHeight - the height of one GraphNode's ChartRectangle
   * @param ySpacing - the vertical spacing between GraphNode instances
   */
  public changeGraphSets( graphSetNode: Node,
                          oldGraphNodes: GraphNode[] | null,
                          newGraphNodes: GraphNode[],
                          chartRectangleHeight: number,
                          ySpacing: number ): void {

    // Stop any animations that are in progress.
    this.fadeOutAnimation && this.fadeOutAnimation.stop();
    this.fadeInAnimation && this.fadeInAnimation.stop();
    this.translationAnimation && this.translationAnimation.stop();

    // Compute positions for GraphNodes in the new set. They are in top-to-bottom order.
    const x = newGraphNodes[ 0 ].x;
    const yEndCoordinates = [ 0 ];
    for ( let i = 1; i < newGraphNodes.length; i++ ) {
      yEndCoordinates.push( yEndCoordinates[ i - 1 ] + chartRectangleHeight + ySpacing );
    }

    // Move immediately to the new state if:
    // there are no old GraphNodes, an animation was in progress, or we're restoring PhET-iO state.
    if ( !oldGraphNodes || this.activeAnimation || phet.joist.sim.isSettingPhetioStateProperty.value ) {

      this.activeAnimation = null;

      // Add the new set of GraphNodes to the scene graph.
      graphSetNode.children = newGraphNodes;

      // Move the new set of GraphNodes to their new positions, and make them all fully opaque.
      for ( let i = 0; i < newGraphNodes.length; i++ ) {
        newGraphNodes[ i ].x = x;
        newGraphNodes[ i ].y = yEndCoordinates[ i ];
        newGraphNodes[ i ].opacity = 1;
      }
    }
    else {

      //------------------------------------------------------------------------------------------------------------
      // Fade out GraphNodes that are being added (in oldGraphNodes, but not in newGraphNodes).
      //------------------------------------------------------------------------------------------------------------

      const graphNodesToRemove = oldGraphNodes.filter( graphNode => !newGraphNodes.includes( graphNode ) );

      this.fadeOutOpacityProperty.unlinkAll();
      this.fadeOutOpacityProperty.lazyLink( opacity => {
        graphNodesToRemove.forEach( graphNode => graphNode.setOpacity( opacity ) );
      } );

      this.fadeOutAnimation = new Animation( {
        stepEmitter: STEPPER,
        duration: ( graphNodesToRemove.length > 0 ) ? OPACITY_DURATION : TINY_DURATION,
        targets: [ {
          property: this.fadeOutOpacityProperty,
          easing: Easing.LINEAR,
          from: 1,
          to: 0
        } ]
      } );

      this.fadeOutAnimation.startEmitter.addListener( () => {
        this.activeAnimation = this.fadeOutAnimation;
      } );

      this.fadeOutAnimation.finishEmitter.addListener( () => {
        graphNodesToRemove.forEach( node => graphSetNode.removeChild( node ) );
        this.activeAnimation = null;
        this.fadeOutAnimation = null;
        this.fadeOutOpacityProperty.unlinkAll();
        assert && assert( this.translationAnimation );
        this.translationAnimation!.start();
      } );

      //------------------------------------------------------------------------------------------------------------
      // Translate GraphNodes to their new positions. Note that this includes GraphNodes that are new to
      // the GraphSet, and will not be visible until fadeInAnimation runs.
      //------------------------------------------------------------------------------------------------------------

      const yStartCoordinates = newGraphNodes.map( graphNode => graphNode.y );
      assert && assert( yStartCoordinates.length === yEndCoordinates.length );

      this.percentDistanceProperty.unlinkAll();
      this.percentDistanceProperty.lazyLink( percentDistance => {
        for ( let i = 0; i < newGraphNodes.length; i++ ) {
          const graphNode = newGraphNodes[ i ];
          const yStart = yStartCoordinates[ i ];
          const yEnd = yEndCoordinates[ newGraphNodes.indexOf( graphNode ) ];
          graphNode.x = x;
          graphNode.y = yStart + percentDistance * ( yEnd - yStart );
        }
      } );

      this.translationAnimation = new Animation( {
        stepEmitter: STEPPER,
        duration: ( newGraphNodes.length > 0 ) ? TRANSLATION_DURATION : TINY_DURATION,
        targets: [ {
          property: this.percentDistanceProperty,
          easing: Easing.LINEAR,
          from: 0,
          to: 1
        } ]
      } );

      this.translationAnimation.startEmitter.addListener( () => {
        this.activeAnimation = this.translationAnimation;
      } );

      this.translationAnimation.finishEmitter.addListener( () => {
        this.activeAnimation = null;
        this.translationAnimation = null;
        this.percentDistanceProperty.unlinkAll();
        assert && assert( this.fadeInAnimation );
        this.fadeInAnimation!.start();
      } );

      //------------------------------------------------------------------------------------------------------------
      // Fade in GraphNodes that are being added (in newGraphNodes, but not in oldGraphNodes).
      //------------------------------------------------------------------------------------------------------------

      const graphNodesToAdd = newGraphNodes.filter( graphNode => !oldGraphNodes.includes( graphNode ) );

      this.fadeInOpacityProperty.unlinkAll();
      this.fadeInOpacityProperty.link( opacity => {
        graphNodesToAdd.forEach( graphNode => graphNode.setOpacity( opacity ) );
      } );

      this.fadeInAnimation = new Animation( {
        stepEmitter: STEPPER,
        duration: ( graphNodesToAdd.length > 0 ) ? OPACITY_DURATION : TINY_DURATION,
        targets: [ {
          property: this.fadeInOpacityProperty,
          easing: Easing.LINEAR,
          from: 0,
          to: 1
        } ]
      } );

      this.fadeInAnimation.startEmitter.addListener( () => {
        graphNodesToAdd.forEach( graphNode => graphSetNode.addChild( graphNode ) );
        this.activeAnimation = this.fadeInAnimation;
      } );

      this.fadeInAnimation.finishEmitter.addListener( () => {
        assert && assert( _.every( newGraphNodes, graphNode => graphSetNode.hasChild( graphNode ) ) );
        assert && assert( _.every( newGraphNodes, graphNode => ( graphNode.opacity === 1 ) ) );
        this.activeAnimation = null;
        this.fadeInAnimation = null;
        this.fadeInOpacityProperty.unlinkAll();
      } );

      // ... and away we go.
      this.fadeOutAnimation.start();
    }
  }

  public step( dt: number ): void {
    this.activeAnimation && this.activeAnimation.step( dt );
  }
}

calculusGrapher.register( 'GraphSetsAnimator', GraphSetsAnimator );