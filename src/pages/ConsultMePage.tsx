import dashboardScene from '../assets/dashboard-scene.svg'
import securityScene from '../assets/security-scene.svg'
import platformScene from '../assets/platform-scene.svg'

function ConsultMePage() {
  const impactHighlights = [
    {
      label: 'Current Role',
      value: 'Technical Lead',
      note: 'Leading delivery and architecture decisions on a Checkmarx-focused engagement.',
    },
    {
      label: 'Core Outcome',
      value: 'Lower Java Vulnerabilities',
      note: 'Driving secure coding and remediation workflows to reduce vulnerability exposure.',
    },
    {
      label: 'Team Leadership',
      value: '4 Developers Managed',
      note: 'Managing workload distribution for 2 junior and 2 senior developers.',
    },
  ]

  const coreStrengths = [
    {
      title: 'Checkmarx SAST / SCA / DAST Program',
      details:
        'Implement security scanning gates in CI/CD, prioritize findings by risk, and maintain a remediation playbook for Java teams.',
      image: securityScene,
    },
    {
      title: 'Technical Leadership and Team Throughput',
      details:
        'Plan sprints, break down technical work, mentor 2 juniors while enabling 2 seniors to own complex tracks, and keep delivery predictable.',
      image: platformScene,
    },
    {
      title: 'Operational Visibility with Grafana',
      details:
        'Set up dashboards and alerting to track service health, incident trends, and post-release stability for engineering leadership.',
      image: dashboardScene,
    },
  ]

  return (
    <section className="section-shell section-block route-page consult-page consult-redesign">
      <div className="consult-head">
        <p className="eyebrow">Hire Me</p>
        <h1>Technical Lead for secure Java delivery and AppSec execution.</h1>
        <p className="page-copy">
          I currently lead technical delivery in a Checkmarx project focused on
          reducing vulnerabilities in Java applications while maintaining team velocity.
        </p>
      </div>

      <figure className="page-media page-media-wide">
        <img src={securityScene} alt="Application security and technical leadership" />
      </figure>

      <div className="consult-impact-grid">
        {impactHighlights.map((item) => (
          <article key={item.label} className="consult-impact-card">
            <p className="consult-impact-label">{item.label}</p>
            <h2>{item.value}</h2>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <div className="consult-grid">
        {coreStrengths.map((area) => (
          <article key={area.title} className="consult-card">
            <figure className="consult-media">
              <img src={area.image} alt={area.title} />
            </figure>
            <h2>{area.title}</h2>
            <p>{area.details}</p>
          </article>
        ))}
      </div>

      <div className="consult-cta">
        <a className="btn btn-primary" href="mailto:jamalmohamad.ik@gmail.com">
          Hire me as Technical Lead
        </a>
      </div>
    </section>
  )
}

export default ConsultMePage

