import './Card.css'

export default function Card({
  image,
  title,
  subtitle,
  children,
  onClick,
  className = '',
  ...props
}) {
  const classNames = ['card', className].filter(Boolean).join(' ')

  return (
    <article className={classNames} onClick={onClick} {...props}>
      {image && (
        <div className="card-image">
          <img src={image} alt="" loading="lazy" />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children && <div className="card-body">{children}</div>}
      </div>
    </article>
  )
}