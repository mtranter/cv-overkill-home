import {HomeWidgetsService} from './../../../src/home/home-widgets-service'

describe('Index', () => {
  it('should sort correctly', () => {
    let svc = new HomeWidgetsService([{name:'experience'}, {name:'profile'}]);
    expect(svc.widgets[0].name).toBe('profile')
    expect(svc.widgets[1].name).toBe('experience')
  })
})
