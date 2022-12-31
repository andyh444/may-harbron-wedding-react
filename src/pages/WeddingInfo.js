import React from "react";
import eucalyptusImage from "../Images/Eucalyptus.png"
import perfectPigImage from "../Images/perfectpiglogo.png"

function WeddingInfo() {
    return (
        <div className="page">
				<div className="eucalyptusImageContainer" >
					<img className="eucalyptusImage" src={eucalyptusImage}  />
					<h2>Ceremony</h2>
				</div>
				<p>Ceremony to start at 1 pm. Please aim to be there by 12:30.</p>
				<p>Ceremony and Reception to all be held at Sopley Mill:</p>
				<div className="VenueInfo">
					<div className="AddressBox">
						<div className="AddressBoxBackground"></div>
						<div className="AddressParagraphs">
							<p>Sopley Mill</p>
							<p>Mill Lane</p>
							<p>Nr Christchurch</p>
							<p>Dorset</p>
							<p>BH23 7AU</p>
						</div>
					</div>
					<div className="MapBox">
						<iframe id="gmap_canvas" height="100%" width="100%" src="https://maps.google.com/maps?q=Sopley%20Mill,%20Mill%20Lane,%20Nr%20Christchurch,%20Dorset,%20BH23%207AU&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
					</div>
				</div>
				<div className="eucalyptusImageContainer" >
					<img className="eucalyptusImage" src={eucalyptusImage} />
					<h2>Food</h2>
				</div>
				<p>All food will be provided by the <a href="http://theperfectpig.co.uk/" target="_blank">Perfect Pig</a></p>
				<img src={perfectPigImage} />
				<br />
				<div id="canapes" className="menubox">
					<h3>Canapes</h3>
					<ul>
						<li>Chipolatas (GF)</li><br/>
						<li>Spring rolls (Vg)</li><br/>
						<li>Goat's cheese mini waffle cones (V)</li><br/>
						<li>Popcorn chicken</li><br/>
						<li>Crab scones</li><br/>
						<li>Stuffed new potatoes (V)</li>
					</ul>
				</div>
				<div id="breakfast" className="menubox">
					<h3>Breakfast</h3>
					<ul>
						<li>Pan-roasted chicken wrapped in smoked pancetta</li>
						<br/><span>-OR-</span><br/><br/>
						<li>Stuffed sweet peppers (Vg)</li>
						<br/>
						<li>Summer trifle to finish</li>
						<br/>
						<li>For kids: Chicken nuggets, chips and peas</li>
					</ul>
				</div>
				<div id="evening" className="menubox">
					<h3>Evening</h3>
					<ul>
						<li>Wood-fired pizza bar</li>
					</ul>
				</div>
				<p>GF - gluten free, Vg - vegan, V - vegetarian</p>
				<p>TODO: Mention alcohol</p>
				<br />
				<div className="eucalyptusImageContainer" >
					<img className="eucalyptusImage" src={eucalyptusImage} />
					<h2>Where to stay</h2>
				</div>
				<p>As Sopley Mill is on the edge of the New Forest, there is no shortage of places to stay in the area</p>
				<p>Some handy nearby hotels are:</p>
				<div className="menubox" style={{"width": "40%"}}>
					<ul>
						<li><a href="https://www.premierinn.com/gb/en/hotels/england/dorset/christchurch/christchurch-west.html?ARRdd=29&ARRmm=10&ARRyyyy=2022&NIGHTS=1&ROOMS=1&ADULT1=1&CHILD1=0&COT1=0&INTTYP1=DB&BRAND=PI&mckv=wzQL00L1_dc|pcrid|76003906438327|kword|premier%20inn%20christchurch|match|be|plid||pgrid|1216059966486568|ptaid|kwd-76003824678109:loc-188|&ef_id=a3348d190eca148908d1ee443106531d:G:s&s_kwcid=AL!9693!10!76003906438327!76003824678109&msclkid=a3348d190eca148908d1ee443106531d">Premier Inn Christchurch (West)</a> - 4 miles from the venue</li>
						<li><a href="https://www.premierinn.com/gb/en/hotels/england/dorset/christchurch/christchurch-east.html?ARRdd=29&ARRmm=10&ARRyyyy=2022&NIGHTS=1&ROOMS=1&ADULT1=1&CHILD1=0&COT1=0&INTTYP1=DB&BRAND=PI&mckv=wzQL00L1_dc|pcrid|76003906438327|kword|premier%20inn%20christchurch|match|be|plid||pgrid|1216059966486568|ptaid|kwd-76003824678109:loc-188|&ef_id=a3348d190eca148908d1ee443106531d:G:s&s_kwcid=AL!9693!10!76003906438327!76003824678109&msclkid=a3348d190eca148908d1ee443106531d">Premier Inn Christchurch (East)</a> - 4 miles from the venue</li>
						<li><a href="https://www.fishermanshauntdorset.co.uk/">The Fisherman's Haunt</a> - 1 mile from the venue</li>
					</ul>
				</div>
				<p>There are also many campsites, including:</p>
				<div className="menubox" style={{"width": "40%"}}>
					<ul>
						<li><a href="">Some random campsite</a> - 4000 miles from the venue</li>
					</ul>
				</div>
				<br />
				<div className="eucalyptusImageContainer" >
					<img className="eucalyptusImage" src={eucalyptusImage} />
					<h2>Parking</h2>
				</div>
				<p>Sopley mill has a car park on site.</p>
				<p>You can leave your car overnight but make sure to pick it up by 11 am!</p>
				<p>Unfortunately camper vans are not allowed overnight</p>
				<br/>
				<div className="eucalyptusImageContainer" >
					<img className="eucalyptusImage" src={eucalyptusImage} />
					<h2>Gifts</h2>
				</div>
				<p>Give us all your cash.</p>
			</div>
    )
}

export default WeddingInfo;