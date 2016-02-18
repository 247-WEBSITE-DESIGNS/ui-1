import Ember from 'ember';

const { getOwner } = Ember;

/*
 * Many link-to and resource-action-menus components on the screen are pretty slow.
 * So instead a static <a> and <button> are put in the template and this handles the clicks.
 */
export default Ember.Mixin.create({
  resourceActions: Ember.inject.service('resource-actions'),

  click(event) {
    var btn = $(event.target).closest('BUTTON');
    if ( btn && btn.hasClass('more-actions') ) // Only menu buttons
    {
      this.get('resourceActions').show(this.get('model'), btn);
    }
    else if ( event.target.tagName === 'A' && $(event.target).data('transitionLink')) // Only links with data-transition-link
    {
      getOwner(this).lookup('router:main').transitionTo(event.target.pathname);
      event.preventDefault();
      return false;
    }
  }
});
