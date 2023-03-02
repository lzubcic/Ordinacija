const About = () => {

    const aboutText = `
    With energy for dentistry, Dr.Ryan Reynolds began ‘Dental clinic’ in Boston in 1982 spreading over five
    dental focuses and a dental research facility crosswise over Stockholm.

    Concentrated on his vision of giving remarkable administrations in dentistry, Dr. Ryan extended to the UAE,
    where he right now runs cutting-edge multispecialty dental clinics. Three of which are situated along Al Wasl
    Road (Umm Suqeim) and one in Jumeirah.

    Since its introduction to the world in Dubai in 1998, ‘Dental clinic’ has fabricated a fortunate place
    in the business as a standout amongst the most confided in dental social insurance suppliers in the locale.

    Consistent with its notoriety, ‘Dental clinic’ has grown multiple times in the course of the most recent
    fifteen years with a profoundly dedicated group of specialists serving in excess of 50,000 patients to date.
    `

    return (
        <div className="container">
            <h1 className="mt-3">Learn more about us...</h1>

            <section>
                <p style={{ display: "block", whiteSpace: "pre-wrap" }}>
                    {aboutText}
                </p>
                <img
                    style={{ borderRadius: "15%" }}
                    src="https://www.milesight.com/structure/image/press/case-study/primadent-dental-clinic/cover.png"
                    alt="building"
                />
            </section>

        </div>
    )
}

export default About;