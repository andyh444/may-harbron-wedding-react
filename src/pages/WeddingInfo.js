import React from "react";
import perfectPigImage from "../Images/perfectpiglogo.png"
import EucalyptusHeader from "../components/eucalyptusHeader";
import HotelCard from "../components/hotelCard";
import "./WeddingInfo.css"

function WeddingInfo() {
    return (
        <div className="page">
				<EucalyptusHeader title="Ceremony" />
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
				<p>To get there: Follow the A31 to Ringwood, then take the B3347 to Sopley</p>
				<EucalyptusHeader title="Food" />
				<p>All food will be provided by the <a href="http://theperfectpig.co.uk/" target="_blank" rel="noopener noreferrer">Perfect Pig</a></p>
				<img src={perfectPigImage} alt="" />
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
				<EucalyptusHeader title="Where to stay" />
				<p>As Sopley Mill is on the edge of the New Forest, there is no shortage of places to stay in the area</p>
				<p>Some handy nearby hotels are:</p>
				<div className="hotelCards">
					<HotelCard
						linkUrl="https://www.premierinn.com/gb/en/hotels/england/dorset/christchurch/christchurch-west.html"
						imageUrl="https://www.premierinn.com/content/dam/pi/websites/hotelimages/gb/en/C/CHRBAI/xCHRBAI,P202.jpg.pagespeed.ic.VgjjJl5zAp.webp"
						name="Premier Inn Christchurch (West)"
						noOfMiles={4} />
					<HotelCard
						linkUrl="https://www.premierinn.com/gb/en/hotels/england/dorset/christchurch/christchurch-east.html"
						imageUrl="https://www.premierinn.com/content/dam/pi/websites/hotelimages/gb/en/C/CHRSOM/xCHRSOM,P201.jpg.pagespeed.ic.MMEgQhj_Ri.webp"
						name="Premier Inn Christchurch (East)"
						noOfMiles={4} />
					<HotelCard
						linkUrl="https://www.fishermanshauntdorset.co.uk/"
						imageUrl="https://www.fishermanshauntdorset.co.uk/-/media/sites/pubs-and-hotels/f/the-fishermans-haunt-_-p208/images/gallery-2022/tsp-170518-758.ashx"
						name="The Fisherman's Haunt"
						noOfMiles={1} />
					<HotelCard
						linkUrl="https://www.thebearofburton.co.uk/"
						imageUrl="https://www.thebearofburton.co.uk/-/media/sites/pubs-and-hotels/b/the-bear-of-burton-_-p200/images/gallery-2022/bearofburton-01.ashx"
						name="The Bear of Burton"
						noOfMiles={2.5} />
				</div>
				<p>There are also many campsites, including:</p>
				<div className="menubox" style={{"width": "40%"}}>
					<ul>
						<li><a href="">Some random campsite</a> - 4000 miles from the venue</li>
					</ul>
				</div>
				<br />
				<EucalyptusHeader title="Parking" />
				<p>Sopley mill has a car park on site.</p>
				<p>You can leave your car overnight but make sure to pick it up by 11 am!</p>
				<p>Unfortunately camper vans are not allowed overnight</p>
				<br/>
				<EucalyptusHeader title="Gifts" />
				<p>Give us all your cash.</p>
			</div>
    )
}

export default WeddingInfo;