const core = require("@actions/core");
const fs = require("fs");
const path = require("path");

const productLicenseFile = path.resolve("./license-manager/product-license")

const licenseFile = path.resolve("./LICENSE");

const packagePath = path.resolve("./package.json");
const extractedProdLicenseFilePath = path.resolve("./licenses-prod.json");

const licenseManagerDevConfigPath = path.resolve("./license-manager/license-manager-dev.config.js");
const extractedDevLicenseFilePath = path.resolve("./licenses-dev.json");

let packageInfo = {};
try {
  packageInfo = JSON.parse(fs.readFileSync(packagePath).toString());
} catch (error) {
  core.setFailed(error.message);
}

let dependenciesList;
try {
  dependenciesList = Object.keys(packageInfo.dependencies);
} catch (_) {
  dependenciesList = [];
}

let devDependenciesList;
try {
  devDependenciesList = Object.keys(packageInfo.devDependencies);
} catch (_) {
  devDependenciesList = [];
}

let prodLicensesInfo = [];
try {
  prodLicensesInfo = JSON.parse(
    fs.readFileSync(extractedProdLicenseFilePath).toString(),
  );
} catch (error) {
  core.setFailed(error.message);
}

let devNeedExportDependencies = [];
const devConfig = require(licenseManagerDevConfigPath);
if (devConfig.analyze && devConfig.analyze.allowPackages) {
  const devAllowPackages = devConfig.analyze.allowPackages;
  devNeedExportDependencies = devDependenciesList.filter((dep) => {
    return devAllowPackages.includes(dep);
  });
}

let devLicensesInfo = [];
try {
  devLicensesInfo = JSON.parse(
    fs.readFileSync(extractedDevLicenseFilePath).toString(),
  );
} catch (error) {
  core.setFailed(error.message);
}

let licenseContent = "";

try {
  licenseContent = `${fs.readFileSync(productLicenseFile).toString()}


`;
} catch (e) {
  licenseContent = "";
}

if (dependenciesList.length > 0 || devNeedExportDependencies.length > 0) {
  licenseContent += `Licenses for Third-Party Libraries

  The following section contains licensing information for the libraries
  that we have included in this product.
`;
}

const formatLicenseContent = (licenseInfo) => {
  let repository;
  if (Object.prototype.hasOwnProperty.call(licenseInfo, "repository")) {
    if (typeof licenseInfo.repository === "string") {
      repository = licenseInfo.repository;
    } else {
      repository = licenseInfo.repository?.url
        ? licenseInfo.repository.url
        : "";
    }
  }

  return `

${licenseInfo.name}${repository ? `\nrepository: ${repository}` : ""}
version: ${licenseInfo.version}
license: ${licenseInfo.license}
${licenseInfo.licenseText}
=============================
`;
};

dependenciesList.forEach((dependency) => {
  for (let i = 0; i < prodLicensesInfo.length; i++) {
    const licenseInfo = prodLicensesInfo[i];
    if (dependency === licenseInfo.name) {
      licenseContent += formatLicenseContent(licenseInfo);
    }
  }
});

devNeedExportDependencies.forEach((dependency) => {
  for (let i = 0; i < devLicensesInfo.length; i++) {
    const licenseInfo = devLicensesInfo[i];
    if (dependency === licenseInfo.name) {
      licenseContent += formatLicenseContent(licenseInfo);
    }
  }
});

fs.writeFileSync(licenseFile, licenseContent);
core.setOutput("license_file_path", licenseFile);
