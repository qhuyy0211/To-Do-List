const init = {
  config: {},
  headings: [],
  infos: [],
}

export default function reducer(state = init, action, args) {
  switch(action) {
    case 'ADD_INFO':
      let [info] = args
      if (!Array.isArray(info)) {
        info = [info];
      }
      return {
        ...state,
        infos: [...state.infos, ...info]
      }
    case 'ADD_HEADING':
      let [heading] = args
      if (!Array.isArray(heading)) {
        heading = [heading];
      }
      return {
        ...state,
        headings: [...state.headings, ...heading]
      }
    case 'REMOVE_INFO':
      let [elementId] = args;
      const elementIndex = state.infos.findIndex((info) => {
        return info.id === elementId;
      })
      state.infos.splice(elementIndex, 1)
      return {
        ...state,
        infos: [...state.infos]
      }
    case 'CHANGE_FILTER':
      const [status] = args
      return {
        ...state,
        config: {
          ...state.config,
          status: status
        }
      }
    case 'CHANGE_THEME':
      const [theme] = args
      return {
        ...state,
        config: {
          ...state.config,
          theme: theme
        }
      }
    case 'CHANGE_HEADING':
      const [headingContent, headingId] = args
      const headingIndex = state.headings.findIndex((heading) => {
        return heading.id == headingId;
      })
      state.headings[headingIndex].content = headingContent
      return {
        ...state,
        headings: [...state.headings]
      }
    case 'CHANGE_INFO_STATUS':
      let [infoStatus, infoId] = args
      const infoIndex = state.infos.findIndex((info) => {
        return info.id == infoId;
      })
      state.infos[infoIndex].status = infoStatus
      return {
        ...state,
        infos: [...state.infos]
      }
    default:
      return state;
  }
}