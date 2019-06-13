import React from 'react';
import Review from '../client/components/Review';
import { shallow, mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';

let review;

describe('Review component', () => {
  beforeAll(() => {
    review = {
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
  });

  test('matches snapshot', () => {
    let wrapper = mount(<Review review={review}></Review>);
    // console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });

  test('accepts review props', () => {
    let wrapper = mount(<Review review={review}></Review>);
    expect(wrapper.prop('review')).toEqual(review);
  });

  test('test properly renders', () => {
    let wrapper = mount(<Review review={review}></Review>);
    // console.log( wrapper.find('.text').text() );
    expect(wrapper.find('.text').text()).toEqual(review.reviewText);
  });
});