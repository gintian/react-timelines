import React from 'react'
import { shallow } from 'enzyme'

import TrackKey from '../TrackKey'
import TrackKeys from '../'
import Chevron from '../../../Elements/Chevron'

describe('<TrackKey />', () => {
  describe('link', () => {
    it('renders if passed', () => {
      const track = { link: 'test-url', title: 'test-title' }
      const wrapper = shallow(<TrackKey track={track} />)
      expect(wrapper.find('[href="test-url"]').text()).toMatch('test-title')
    })

    it('renders <Chevron /> if passed', () => {
      const track = { link: 'test-url', title: 'test-title' }
      const wrapper = shallow(<TrackKey track={track} />)
      expect(wrapper.find('[href="test-url"]').find(Chevron).exists()).toBe(true)
    })
  })

  describe('toggle button', () => {
    const getToggleButton = node => node.find('.track-key__toggle')

    it('renders when "track.isOpen" is defined', () => {
      const props = {
        track: { title: 'test', isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).exists()).toBe(true)
    })

    it('does not render when "track.isOpen" is undefined', () => {
      const props = {
        track: { title: 'test', isOpen: undefined },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).exists()).toBe(false)
    })

    it('renders with the text "Close" when "track.isOpen" is "true"', () => {
      const props = {
        track: { title: 'test', isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).text()).toBe('Close')
    })

    it('renders with the text "Open" when "track.isOpen" is "false"', () => {
      const props = {
        track: { title: 'test', isOpen: false },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).text()).toBe('Open')
    })

    it('calls "toggleOpen()" when clicked passing "track" as a single argument', () => {
      const track = {
        title: 'test',
        isOpen: false
      }
      const toggleOpen = jest.fn()
      const props = {
        track,
        toggleOpen
      }
      const wrapper = shallow(<TrackKey {...props} />)
      getToggleButton(wrapper).simulate('click')
      expect(toggleOpen).toBeCalledWith(track)
    })
  })

  describe('<TrackKeys />', () => {
    it('renders when "isOpen" is truthy and "tracks" is not empty', () => {
      const props = {
        track: { title: 'test', tracks: [{}], isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(true)
    })

    it('does not render when "isOpen" is falsy', () => {
      const props = {
        track: { title: 'test', tracks: [{}], isOpen: false },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(false)
    })

    it('does not render when "tracks" is falsy', () => {
      const props = {
        track: { title: 'test', tracks: null, isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(false)
    })

    it('does not render when "tracks" is an empty array', () => {
      const props = {
        track: { title: 'test', tracks: [], isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(false)
    })
  })
})
