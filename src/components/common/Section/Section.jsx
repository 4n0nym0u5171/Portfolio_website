import './Section.css'

export default function Section({
  title,
  subtitle,
  children,
  className = '',
  id,
  tag = 'section'
}) {
  const Tag = tag
  const classNames = ['section', className].filter(Boolean).join(' ')

  return (
    <Tag id={id} className={classNames} aria-labelledby={title ? `${id}-title` : undefined}>
      <div className="section-container">
        {(title || subtitle) && (
          <header className="section-header">
            {title && (
              <h2 id={`${id}-title`} className="section-title article-title">
                {title}
              </h2>
            )}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </header>
        )}
        <div className="section-content">
          {children}
        </div>
      </div>
    </Tag>
  )
}