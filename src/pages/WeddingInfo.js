import React from "react";
import perfectPigImage from "../Images/perfectpiglogo.png"
import EucalyptusHeader from "../components/eucalyptusHeader";
import HotelCard from "../components/hotelCard";
import "./WeddingInfo.css"

function WeddingInfo({isEvening}) {

	function getCeremonyInfo() {
		return (
			<div>
				<EucalyptusHeader title="Ceremony" />
				<p>Ceremony to start at 1 pm. Please aim to be there by 12:30.</p>
				<p>Ceremony and Reception to all be held at Sopley Mill:</p>
			</div>
		);
	}

	function getReceptionInfo() {
		return (
			<div>
				<EucalyptusHeader title="Reception" />
				<p>Reception to start at 7pm.</p>
				<p>Reception to be held at Sopley Mill:</p>
			</div>
		);
	}

    return (
        <div className="page">
				{isEvening ? getReceptionInfo() : getCeremonyInfo()}
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
				<div className="hotelCards">
					<HotelCard
						linkUrl="https://www.newforestcampsite.com/the-old-airfield/"
						imageUrl="https://images.campsites.co.uk/campsite/30126/33c41468-6e47-4a5c-8601-00d411ba6bf5/840/560/either/the-old-airfield.jpg"
						name="The Old Airfield"
						noOfMiles={5} />
					<HotelCard
						linkUrl="https://www.forestbelltents.com/"
						imageUrl="https://www.forestbelltents.com/images/resources/lake/sopley_lake.jpg"
						name="Forest Bell Tents"
						noOfMiles={1.8} />
					<HotelCard
						linkUrl="https://www.forestyurts.com/"
						imageUrl="https://images.campsites.co.uk/campsite/28478/34998463-3d4b-49bd-9012-2c8308e22253/840/560/either/forest-yurts.jpg"
						name="Forest Yurts"
						noOfMiles={1.1} />
					<HotelCard
						linkUrl="https://www.shorefield.co.uk/holidays/locations/oakdene-forest-park"
						imageUrl="https://images.campsites.co.uk/campsite/15332/f6e78aaf-321f-4962-8b31-4ef9607c5951/840/560/either/oakdene-forest-park.jpg"
						name="Oakdene Forest Park"
						noOfMiles={1.8} />
					<HotelCard
						linkUrl="https://www.caravan-sites.co.uk/"
						imageUrl="https://images.campsites.co.uk/campsite/15330/45505e98-d11c-4f30-953b-83b51040a94b/840/560/either/harrow-wood-farm-caravan-park.jpg"
						name="Oakdene Forest Park"
						noOfMiles={2.9} />
				</div>
				<br />
				<EucalyptusHeader title="Parking" />
				<p>Sopley mill has a car park on site.</p>
				<p>You can leave your car overnight but make sure to pick it up by 11 am!</p>
				<p>Unfortunately camper vans are not allowed overnight</p>
				<br/>
				<EucalyptusHeader title="Gifts" />
				<p>As we already live together, we've already accumulated more items than we have storage for</p>
				<p>If you would like to give a gift, we are saving for a house deposit</p>
			</div>
    )
}

export default WeddingInfo;