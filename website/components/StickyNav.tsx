import {SiteNav, SiteNavProps} from '@components/SiteNav'

export const StickyNav = (props: SiteNavProps) => (
  <div className="outer site-nav-main">
    <div className="inner">
      <SiteNav {...props} />
    </div>
  </div>
)
