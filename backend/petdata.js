import fs from 'fs/promises';

async function fetchDataAndSaveToFile() {
  try {
    const response = await fetch(
      'https://api.rescuegroups.org/v5/public/animals/search/&include=breeds,locations?sort=-animals.id&limit=100',
      {
        method: 'GET',
        headers: {
          authorization: process.env.RESCUEGROUPS_API_KEY,
          'Content-Type': 'application/vnd.api+json'
        }
      }
    );

    const data = await response.json();

    // Process and structure the data
    const petsData = data.data.map(r => ({
      name: r.attributes.name ?? '',
      animalId: r.id ?? '',
      sex: r.attributes.sex ?? '',
      birthDate: r.attributes.birthDate,
      breed: r.attributes.breedString,
      size: r.attributes.sizeGroup,
      housetrained: r.attributes.isHouseTrained,
      health: {
        isCurrentVaccinations: r.attributes.isCurrentVaccinations,
        isSpecialNeeds: r.attributes.isSpecialNeeds
      },
      goodWith: {
        dogs: r.attributes.isDogsOk,
        cats: r.attributes.isCatsOk,
        kids: r.attributes.isKidsOk
      },
      isAdoptionPending: r.attributes.isAdoptionPending,
      locationID: r.relationships.locations.data[0]?.id,
      descriptionText: r.attributes.descriptionText,
      pictureThumbnailUrl: r.attributes.pictureThumbnailUrl,
      updatedDate: r.attributes.updatedDate
    }));

    // Convert data to JSON format and save it to a file
    await fs.writeFile('petsData.json', JSON.stringify(petsData, null, 2));
    console.log('Data saved to petsData.json');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
}

fetchDataAndSaveToFile()