import React from 'react';
import Reviews from '../client/components/Reviews';
import { shallow, mount, render } from 'enzyme';

let reviews;
let review = {
  bId: 7,
  uId: 90,
  rating: 1,
  checkin: false,
  createdAt: "2013-02-19T13:16:04.526Z",
  updatedAt: "2013-02-19T13:16:04.526Z",
  reviewText: "My taste buds are still tingling from our last visit! The food was flavorful, savory, and succulent. I want to hire their decorator to furnish my apartment. Overall experience: 5 stars.",
  cool: [{uId: 98, username: "Waylon Reilly"}],
  funny: [{uId: 75, username: "Lavada Hermiston"}, {uId: 7, username: "George Schowalter"}],
  useful: [],
};

describe('Reviews component', () => {
  beforeAll(() => {
    reviews = [review, review, review];
  });

  test('accepts reviews props', () => {
    let wrapper = mount(<Reviews reviews={reviews}></Reviews>);
    // console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('reviews')).toEqual(reviews);
  });

  test('properly renders 3 reviews', () => {
    let wrapper = mount(<Reviews reviews={reviews}></Reviews>);
    // console.log(wrapper.find('.text').debug());
    expect(wrapper.find('.text').reduce((amount,n) => amount + 1, 0)).toEqual(3);
  });

});