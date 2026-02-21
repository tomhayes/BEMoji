/**
 * BEMoji React Example
 *
 * Demonstrates the `bem()` helper and `useBem()` hook for composing
 * emoji class names in JSX components.
 */

import { useState } from 'react';
import { bem, useBem } from 'bemoji/react';

// ── Card component ──────────────────────────────────────
function Card({ title, body, featured = false, loading = false, children }) {
  const b = useBem('card');   // Scoped to the 🃏 block

  return (
    <article className={b('', { primary: featured })}>
      <div className={b('image', { featured })}>
        {children}
      </div>
      <div className={b('body')}>
        <h2 className={b('title')}>{title}</h2>
        <p className={b('description')}>{body}</p>
      </div>
    </article>
  );
}

// ── Alert component ─────────────────────────────────────
function Alert({ type = 'info', title, children, onDismiss }) {
  const typeToModifier = {
    info:    '🌟',
    success: '🟢',
    warning: '🟡',
    danger:  '🔴',
  };

  const icons = {
    info: 'ℹ️', success: '✅', warning: '⚠️', danger: '🚨',
  };

  return (
    <div className={bem('alert', { [type]: true })}>
      <span className={bem('alert__icon')}>{icons[type]}</span>
      <div className={bem('alert__body')}>
        {title && <div className={bem('alert__title')}>{title}</div>}
        {children}
      </div>
      {onDismiss && (
        <button className={bem('alert__close')} onClick={onDismiss}>✕</button>
      )}
    </div>
  );
}

// ── Button component ────────────────────────────────────
function Button({ children, variant = 'default', size = 'md', disabled, loading, pill, fullWidth, onClick }) {
  return (
    <button
      className={bem('button', {
        primary:  variant === 'primary',
        danger:   variant === 'danger',
        success:  variant === 'success',
        ghost:    variant === 'ghost',
        disabled: disabled || loading,
        loading,
        pill,
        'full-width': fullWidth,
        xs: size === 'xs',
        sm: size === 'sm',
        lg: size === 'lg',
        xl: size === 'xl',
      })}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ── Badge component ─────────────────────────────────────
function Badge({ children, variant = 'default' }) {
  return (
    <span className={bem('badge', {
      primary: variant === 'primary',
      danger:  variant === 'danger',
      success: variant === 'success',
      warning: variant === 'warning',
      info:    variant === 'info',
      premium: variant === 'premium',
      new:     variant === 'new',
    })}>
      {children}
    </span>
  );
}

// ── App ─────────────────────────────────────────────────
export default function App() {
  const [alerts, setAlerts] = useState({
    info: true,
    success: true,
    warning: true,
    danger: true,
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>BEMoji React Example</h1>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
          Buttons
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" pill>Pill</Button>
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
          Badges
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="premium">💎 Premium</Badge>
          <Badge variant="new">🆕 New</Badge>
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
          Alerts
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '480px' }}>
          {alerts.info && (
            <Alert type="info" title="Information" onDismiss={() => setAlerts(a => ({ ...a, info: false }))}>
              Your changes have been saved to the cloud.
            </Alert>
          )}
          {alerts.success && (
            <Alert type="success" title="Success!" onDismiss={() => setAlerts(a => ({ ...a, success: false }))}>
              Account created successfully. Welcome aboard.
            </Alert>
          )}
          {alerts.warning && (
            <Alert type="warning" title="Warning" onDismiss={() => setAlerts(a => ({ ...a, warning: false }))}>
              Your session will expire in 5 minutes.
            </Alert>
          )}
          {alerts.danger && (
            <Alert type="danger" title="Error" onDismiss={() => setAlerts(a => ({ ...a, danger: false }))}>
              Something went wrong. Please try again.
            </Alert>
          )}
          {!Object.values(alerts).some(Boolean) && (
            <Button variant="primary" onClick={() => setAlerts({ info: true, success: true, warning: true, danger: true })}>
              Reset alerts
            </Button>
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
          Cards
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <Card title="Standard Card" body="A basic card with all the trimmings.">
            <div style={{ height: 120, background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🃏</div>
          </Card>
          <Card title="Featured Card" body="Elevated and featured modifier applied." featured>
            <div style={{ height: 120, background: 'linear-gradient(135deg, #f093fb, #f5576c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🌟</div>
          </Card>
        </div>
      </section>

    </div>
  );
}
